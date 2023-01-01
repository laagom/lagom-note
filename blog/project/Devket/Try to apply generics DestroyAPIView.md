# [22.11.20] Try to apply generics DestroyAPIView

## Generics View를 사용하지 않는 이유
DRF로 서버단을 rest_framework가 지원해주는 generics View를 사용하지 않고 APIView만을 이용하여 프로젝트를 진행하기로 결정하였다. 그렇게 결정한 이유는 generics한 View를 사용하면 코드가 간결해지고 개발하기 편리해지긴 하지만 팀 프로젝트를 진행하며 그렇게 간결해지고 작동되는 로직을 파악하지 않고 무분별하게 사용하는 것을 우려하여 처음에는 자유롭게 customizing이 가능한 APIView를 사용하기로 했다.

<br>

## APIView로 작성된 Bulk Delete
항목을 다중으로 삭제하기 위한 기능 개발을 위해 클라이언트 단에서 선택한 항목의 id(식별자)를 리스트로 전달하여 서버 단에서 받아 그 항목들을 모두 삭제하는 로직을 개발하였다.

<br>

### 클라이언트 단
```javascript

function setFetchData(method, body){
    /* Fetch data 셋팅 */

    let csrftoken = getCookie('csrftoken');

    const data = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken' : csrftoken,        
        },
        body: JSON.stringify(body)
    }

    return data
}

function bulkDelete() {
    /* 벌크 삭제 이벤트 */

    const data = setFetchData("DELETE", {
        pk_ids: selected_articles, // [1, 2, 3, 4, 5]
    })

    fetch(`/api/sites/bulk`, data)
        .then(response => {
            let status = response.status

            if(status == 200)
                alert('삭제에 성공하였습니다.')                    
        })
        .then(() => getSiteList())
        .then(() => changeSelected())
        .catch(error   => console.log(error))
}
```
- <span style='color:orange;'>bulkDelete()</span>는 조회된 항목들을 선택하여 '벌크 삭제'버튼을 클릭하였을 때 작동하는 이벤트 안의 함수이다. fetch로 api을 요청하기 전에 전달할 data에 선택한 항목에 대한 id(식별자) 값들을 리스트에 담아 {pk_ids : selected_articles}의 키-벨류형태로 설정

- <span style='color:orange;'>setFetchData()</span> 함수는id(식별자) 값들을 리스트에 담으면서 설정해 주고 있으며 HTTP method, headers, body를 셋팅해 주는 함수이다. 위의 {pk_ids : selected_articles}의 키-벨류 형태를 body에 설정

- <strong>'/api/sites/bulk'</strong>로 request를 요청하여 서버단에서 받을 수 있게 fetch함수 작성

<br>

### 서버 단
```python

# urls.py
path('sites/bulk', SiteBulkAPIView.as_view())


# views.py
class SiteBulkAPIView(APIView):
    """
    벌크 항목 삭제 api
    """

    def delete(self, request):

        pk_ids: list = self.request.data.get('pk_ids')

        sites = Site.objects.filter(id__in=pk_ids)

        for site in sites:
            site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)
```
- 라우팅을 '/sites/bulk'로 설정해 주고 SiteBulkAPIView() 클래스가 받을 수 있게 지정
- 'pk_ids'에 담긴 id(식별자)값을 포함하는 모든 Site 항목을 ORM으로 조회 후 반복문을 돌면서 삭제 처리를 진행

- 위의 코드에서 클라이언트에서 HTTP메소드를 'DELETE'로 보냈기 때문에 delete로 작성한 메소드로 들어와 처리가 진행된 과정을 확인하기 위해 아래와 같이 상속받은 클래스를 확인

<br>

### APIView
```python
# 상속받은 APIVIEW
class APIView(View):

    # The following policies may be set at either globally, or per-view.
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    ...

# APIView가 상속받은 View
class View:
    """
    Intentionally simple parent class for all views. Only implements
    dispatch-by-method and simple sanity checking.
    """

    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']

    def dispatch(self, request, *args, **kwargs):
        # Try to dispatch to the right method; if a method doesn't exist,
        # defer to the error handler. Also defer to the error handler if the
        # request method isn't on the approved list.
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)

```
- 상속받은 APIView가 어떻게 HTTP 메소드에 따라 어떻게 작성한 내부 메소드로 들어와 처리가 될 수 있는지 APIView를 타고 들어가 부모 클래스인 View까지 타고 들어가 코드를 확인해 보니 View클래스에서 http 매소드 명에 따라 작성한 내부 메소드로 핸들링해주고 있었다.

<br>

## DestroyAPIView로 delete처리 적용
Delete 처리를할 때 rest_framework의 DestroyAPIView로 처리한다고 공식문서를 확인하여 이를 이용하여 로직을 변경해보려했다. 하지만 DestroyAPiView는 하나의 id(식별자)값만 path파라미터로 받아 처리를 해주는 클래스이기 때문에 bulk처리에는 적합하지 않았다. 그래서 bulk처리가 아닌 단일 삭제 처리 기능에서 DestroyAPIView를 적용해 보았다.<br>
출처 : [DRF 공식문서](https://www.django-rest-framework.org/api-guide/generic-views/#destroyapiview)

<br>

### 클라이언트 단
```javascript
function deleteSite() {

    const data = setFetchData('DELETE', '')

    fetch(`/api/sites/${site.id}`, data)
        .then(response => {
            const status = response.status
            
            if (status === 200) {
                console.log('삭제 완료했습니다.')

            } else if (status === 404) {
                console.log('해당 항목이 존재하지 않습니다.')

            } 
            return response.json() 
        })
        .catch(error => console.log('Error:', error))
}
```
- path파라미터로 id(식별자)를 request 요청

<br>

### 서버 단
```python
# urls.py
path('sites/<int:pk>', SiteDetailAPIView.as_view()),

# views.py
class SiteDetailAPIView(DestroyAPIView):
    """
    항목 단일 삭제 api
    """

    queryset = Site.objects.all()
    serializer_class = SiteSerializer
```
- 라우팅에 path 파라미터를 받을 수 있게 pk로 path를 설정해 준 후 처리하는 클래스에 DestroyAPIView를 상속
- queryset에 ORM으로 모든 Site 조회 후 할당

위 와 같이 작성 후 삭제를 시도하면 삭제되는 코드를 작성하지 않았지만 DestroyAPIView를 상속받은 것 만으로 전달받은 pk값을 인식하여 해당하는 데이터를 처리해준다.

<br>

### DestroyAPIView
```python
# DestroyAPIView
class DestroyAPIView(mixins.DestroyModelMixin,
                     GenericAPIView):
    """
    Concrete view for deleting a model instance.
    """
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# mixins.DestroyModelMixin
class DestroyModelMixin:
    """
    Destroy a model instance.
    """
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
```
코드 작성을 하지 않고 처리가 되는 과정을 확인해 보기 위해 상속받은 DestroyAPIView를 확인해 보았다. DestroyAPIView가 또 다른 두개의 클래스 mixins.DestroyModelMixin와 GenericAPIView를 상속받고 있는데 삭제 처리가 작성되어 있는 DestroyModelMixin 클래스를 타고 들어가 확인해 보면 destroy내부 함수에 perform_destroy로 해당 인스턴스를 삭제하는 코드가 작성된 것을 확인 할 수 있다. 즉, 우리는 이 클래스를 우리가 작성해야하는 코드대신 그 안에서 작성된 처리 코드가 실행되어 처리된다는 것을 알 수 있다.



