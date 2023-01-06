# [22.11.23] APIView bulk update 구현
사용자가 빈번하게 찾아가는 사이트를 북마크처럼 저장하여 저장한 항목들에 대해 즐겨찾기로 등록하여 분류하는 기능을 구현하고 있다.

## 🔖 구현 화면

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/77da56a9-45a8-4ea5-8e4f-0afda6180b76/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230106T041525Z&X-Amz-Expires=86400&X-Amz-Signature=8585a162e1a3ad2371408722efbe318d047e9ababd6c7715608f031ac2598991&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
위의 이미지와 같이 사용자가 등록한 항목을 선택할 수 있고, 선택한 항목들을 bulk(다중)처리가 가능한 기능이다.<br>
- 상단 Toolbar에서 "벌크"버튼 선택으로 등록된 사이트를 선택이 가능하게 javascript로 동적 구현
- 항목을 선택할 때마다 코드에 선언되어 있는 전역변수 selected_articles에 해당 항목에 대한 식별자(id)값을 쌓아주며 벌크 이벤트를 작동하기 위한 선작업을 진행한다.

<br>

## 🔖 클라이언트 javascript
```javascript
function favoriteBulkSelectedSite() {
    /* bulk 즐겨찾기 이벤트 */

    if (selected_articles.length > 0) {
        if(confirm('선택한 항목을 즐겨찾기목록에 추가하시겠습니까?')) {
            const data = setFechData("PUT",{
                pk_ids: selected_articles,  // [1, 2, 3, 4]
                favorite: true,
            })
    
            fetch(`/api/sites/bulk`, data)
                .then(response => {
                    let status = response.status
                    let alert_txt = ''

                    if(status == 200) {
                        alert_txt = '즐겨찾기 목록에 추가하였습니다.'
                    }else if(status == 400) {
                        alert_txt = '즐겨찾기 목록에 추가하지 못했습니다.'
                    }
                    
                    alert(alert_txt)
                })
                .then(() => getSiteList())
                .then(() => changeSelected())
                .catch(error   => console.log(error))      
        }
    }
}
```
- 상단 툴바 즐겨찾기 버튼 클릭 시 위의 코드를 실행
- 선택한 항목의 식별자(id)를 가진 selected_articles 값이 0이상인 경우에만 bulk작업이 가능하게 분기 처리
- setFetchdata()함수에 'PUT'메서드로 데이터를 셋팅해 준 후 Server로 api request를 요청

<br>

## 🔖 서버 APIView
```python
class SiteBulkAPIView(APIView):
    """
    벌크 항목 즐겨찾기, 삭제 api
    """
    def get_list(self):
        pk_ids: list = self.request.data.get('pk_ids')
        
        return get_list_or_404(Site, id__in=pk_ids)
    
    def validate_ids(self):
        pk_ids: list = self.request.data.get('pk_ids')

        for id in pk_ids:
            get_object_or_404(Site,id=id)

        return self.get_list()

    def put(self, request):

        sites = self.validate_ids()
        serializer = SiteSerializer(sites, data=request.data, partial=True, many=True)
    
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            
            return Response({'msg':'Updated successfully'}, status=status.HTTP_202_ACCEPTED)

        return Response({'msg':'Updated successfully'}, status=status.HTTP_200_ACCEPTED)
```
- 3개의 내부 메서드 get_list(), validate_ids(), put() 작성
- put()에서 클라이언트 단에서 받은 식별자(id)값을 포함하는 Site를 조회 할 수 있게 get_list()구현
- serializer를 이용하여 넘겨 받은 데이터 값을 부분적으로 수정할 수 있게 SiteSerializer에 조회한 객체, 데이터, 옵션 partial을 설정
    - 조회한 객체 'sites'
    - 넘겨 받은 데이터 값 'request.data'
    - 부분적으로 수정할 수 있는 옵션 'partial=True'
    - 여러 객체를 수용하는 'many=True'
- serializer를 통해 유효성 체크를 진행 한 후 저장하는 코드를 작성
    - 에러 발생 시 raise_exception=True옵션으로 exception으로 떨어질 수 있게 설정

<br>

## 🔖 Issue1
위와 같이 bulk update처리를 하기 위해 코드를 작성하였지만 아래와 같은 서버에러가 발생하였다.

### 📌 에러 메세지
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3da12b2c-62b6-4863-9ae6-b1da32b88f60/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230106T043119Z&X-Amz-Expires=86400&X-Amz-Signature=406d516b3b069398de5d46ca121f0bb7c39617b41dbb2ea73ab1084462af8b7b&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

many=True옵션을 설정하면 다중 데이터를 bulk로 처리할 수 있다고 하여 위와 같이 코드를 작성하였지만 실패하였다.

[Serializers](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
이는 DRF의 공식문서로 ListSerializer가 존재하며 일반 Serializer와 다르게 여러 객체를 유효성검증 할 수 있다고 설명되어 ListSerialize를 작성해 보았다.

<br>

### 📌 serializer
```python
class SiteSerializer(ModelSerializer):

    CATEGORY_CHOICES = [(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')]

    title = serializers.CharField(max_length=100, allow_blank=False, trim_whitespace=True)
    thumbnail_url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    host_name = serializers.CharField(max_length=30, allow_blank=False, trim_whitespace=True)
    content = serializers.CharField(max_length=2000, allow_blank=True)
    category = serializers.ChoiceField(choices=CATEGORY_CHOICES)
    user = serializers.CharField(max_length=10, allow_blank=False, trim_whitespace=True)
    favorite = serializers.BooleanField(default=False)
    video = serializers.BooleanField(default=False)
    
    
    def create(self, validated_data):
        return Site.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.category = validated_data.get('category', instance.category)
        instance.favorite = validated_data.get('favorite', instance.favorite)
        instance.video = validated_data.get('video', instance.video)
        instance.save()
        return instance    

    class Meta:
        model = Site
        exclude = ["created_at", "updated_at"]

class SiteListSerializer(ListSerializer):
    child = SiteSerializer()

    def update(self, instance, validated_data):

        sites = [Site(**item) for item in validated_data]

        return Site.objects.bulk_update(sites)
```
- 상위의 SiteSerializer는 기본으로 Site모델이 사용하는 serializer이며 하위는 공식문서를 보고 bulk update처리를 위해 작성한 SiteListSerializer이다.
- 위와 같이 작성 후 Site.objects.bulk_update(sites)로 ㅔㅕㅅ으로 요청이 들어 왔을 때 결과값을 반환 시켜놓고 SiteListSerializer를 이용하여 is_valid()를 해보았다.

<br>

### 📌 수정 코드
```python
def put(self, request):

        sites = self.validate_ids()
        
        serializer = SiteListSerializer(sites, data=request.data, partial=True, many=True)
    
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            
            return Response({'msg':'Updated successfully'}, status=status.HTTP_202_ACCEPTED)

        return Response({'msg':'Updated successfully'}, status=status.HTTP_200_ACCEPTED)
```
이렇게 ListSerializer를 사용해도 serializer에서 탐색하는 칼럼이 일치하지 않는 것인지 is_valid()에서 계속 에러가 발생하였다.

<br>

## 🔖 다양한 자료 조사
[django-serializer 자세히 알아보기](https://www.lostcatbox.com/2021/01/19/django-serializer/#Dealing-with-mutiple-objects)<br>

위의 블로그를 찾아보면 multiple create는 가능하지만 update는 불가능하다는 글이 작성되어 있다.
다양한 내용을 찾아 봤지만 multiple update에 대한 내용은 여기가 유일했으며 자세한 내용은 공식문서를 살펴보라고 하니 사실인 내용으로 판단하였다.<br>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f955b97c-52b6-40f5-811b-45a741cf1da7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230106T044030Z&X-Amz-Expires=86400&X-Amz-Signature=d4a63e046717b07102e6f3f13ca558626f92bd31ca768dc9aa12a5a159eb9352&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

<br>

## 🔖 결과
결과적으로 아직 serializer에 many=True옵션을 주고 ListSerializer를 사용하기까지 했는데 is_valid()에서 오류가 발생하는 정확한 이유는 확인하지 못하였다. 멘토링이나 구글링을 하며 삽질도 계속해봤는데 정확한 이유를 찾지는 못해서 우회하여 코드를 작성하였다.

```python
class SiteBulkAPIView(APIView):
    """
    벌크 항목 즐겨찾기, 삭제 api
    """

    def get_list(self):

        pk_ids: list = self.request.data.get('pk_ids')
        
        return get_list_or_404(Site, id__in=pk_ids)
    
    def validate_ids(self):

        pk_ids: list = self.request.data.get('pk_ids')

        for id in pk_ids:
            get_object_or_404(Site,id=id)

        return self.get_list()

    def put(self, request):

        sites = self.validate_ids()
        
        try:
            with transaction.atomic():
                '''트랜젝션 시작'''

                for site in sites:
                    site.favorite = self.request.data.get('favorite')
                    site.save()
        except:
            raise Response({'msg':'Updated failed'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'msg':'Updated successfully'}, status=status.HTTP_200_ACCEPTED)
```
- put함수에서 validate_ids함수를 통해 해당 식별자(id)가 있는지 확인
- 확인이 완료되면 get_list()함수를 반환
- 오류가 발생하면 get_object_or_404를 통해 에러를 내보내기 때문에 try exception은 작성 제외
- 존재유무를 확인 후 반환 값을 반복문을 돌려 'favorite'칼럼을 변경되게 할당해준 후 save처리를 진행하였다.

