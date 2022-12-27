# [22.11.17] Change method of REST API (GET -> POST)
Python 부트캠프 교육 과정을 수료하며 배운 Pure Django로 프로젝트를 진행하지 않고 백엔드와 프론트가 분리된 REST API 방식의 DRF(Django Rest Framework) 프레임워크를 사용하여 프로젝트를 진행하기로 하였다.

<br>

## 1. DRF(Django Rest Framework)를 사용하고자 하는 이유
상세한 DRF를 사용해야하는 이유는 다른 게시 글로 작성하겠지만 프로젝트를 진행하며 나온 첫 번째 이슈사항이기 때문에 사용하고자 하는 이유를 집고 넘어가려고 한다.

<br>

### 🔖 이유
일반적으로 Django만 사용하는 경우에는 DB에서 데이터를 꺼내오면 Queryset의 형태로 데이터가 주어진다. 이 경우 프론트까지 함께 개발하는 경우에는 크게 상관이 없다. 하지만 프론트를 별도로 개발하거나, React 혹은 다른 프론트에서도 이용하게될 API의 경우에는 Queryset형태를 피해야 한다.
<br>

이 때 Django와 함께 사용되는 것이 DRF이다. rest_framework를 사용하게 되면 view와 model 사이에 serializer라는 것을 사용하게 된다. View에서 Serializer를 가져와사 사용하게 되면 Model에서 꺼낸 데이터를 Queryset의 형대가 아니라 json형태로 데이터를 받아올 수 있다.
<br>

<p style='color:orange'>이렇게 Django와 DRF를 함께 사용하면 Python으로 만든 백엔드를 다른 프론트엔드에서도 사용할 수 있게 된다는 장점이 있다.<p>

<br>

## 2. get방식으로 작성된 데이터 저장 api
HTTP에는 post, get, put, delete... 등의 요청을 서버에 알리기 위한 method가 존재하는데 처음 rest api로 개발하는 프로젝트이며 RESTful API의 개념이 바로 잡혀있지 않아 처음 postman을 이용하여 get방식으로 저장하는 코드를 작성하였다.

<br>

이렇게 get방식으로 작성된 저장 코드를 post방식으로 변경하여 RESTful하게 변경작업을 진행하겠다.

<br>

## 3-1. Client 단 요청 코드 수정 (HTTP 요청 데이터 추가)
```javascript
function saveSitebyToolbar () {
    /* toolbar URL 저장 클릭 이벤트 */

    const btnToolbarSave = getElement('.add-button');

    btnToolbarSave.addEventListener('click', () => {

        let inputUrlValue = getElement('.add-input').value;

        fetch(`/api/scrap/parse?url=${inputUrlValue}`)
            .then(response  => response.json())
            .then(result    => console.log(result))
            .catch(error    => console.log(error))
    })
}
```
위의 코드는 클라이언트에서 서버에 get방식을 사용하여 저장하는 요청을 보낸 잘못된 코드이다. 특정 버튼을 클릭했을 때 데이터를 path 파라매터로 담아 fetch함수로 요청하여 서버에서 데이터를 처리하고 있다.

<br>

### 🔖 path 파라매터 -> request body 파라매터 변경
현재 path 파라매터롤 값을 보내고 있는데 request body 파라매터로 변경작업을 해주겠다.
```javascript
function saveSitebyToolbar () {
    /* toolbar URL 저장 클릭 이벤트 */

    ...

        //fetch함수에 담아 보낼 HTTP data 선언
        const data = {
            method  : "GET",
            headers : {'content-type' : 'application/json'},
            body    : JSON.stringify({"url": inputUrlValue})
            }
        
        // path 파람으로 지정되어 있는 쿼리 제거
        fetch('api/scrap/parse/', data)
            .then(response  => response.json())
            .then(result    => console.log(result))
            .catch(err      => console.error(err))
    })
}
```
위의 코드와 같이 fetch함수에 담아 보낼 HTTP data를 선언해준 뒤 method, headers, body에 대한 값을 담아 fetch 함수 매개변수로 추가하여 코드를 수정하였다.

<br>

### 🔖 클라이언트
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aac32b0f-3662-4ea2-baf9-c893f6ff8419/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221227T082551Z&X-Amz-Expires=86400&X-Amz-Signature=c71daf1225760a8eac1c14bfaad3d4285669d51a82eea11097032f7b23fdebe0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

### 🔖 오류
```bash
    toolbar.js:366 TypeError: Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body.at HTMLButtonElement.<anonymous> (toolbar.js:363:9)
```
위의 변경작업 후 화면에서 이벤트를 작동하니 아래와 같이 오류가 발생하였다.<br>
에러가 발생한 이유는 fetch사용으로 request 요청시 GET방식은 body를 보낼 수 없다는 오류 문구이다.

<br>

### 📌 해결
HTTP 요청 데이터에 method를 "GET"방식에서 "POST"방식으로 변경

<br>

## 3-2. Client 단 요청 코드 수정 (GET -> POST 변경)
```javascript
function saveSitebyToolbar () {
    /* toolbar URL 저장 클릭 이벤트 */

    ...

        const data = {
            method  : "POST",
            headers : {'content-type' : 'application/json'},
            body    : JSON.stringify({"url": inputUrlValue})
            }  

        fetch('api/scrap/parse/', data)
            .then(response  => response.json())
            .then(result    => console.log(result))
            .catch(err      => console.error(err))

    })
}
```

HTTP요청에 필요한 method를 "GET"에서 "POST"로 변경 후 클라이언트 단에서 다시 한 번 이벤트를 작동해 보았다.

<br>

### 🔖 오류
```bash
toolbar.js:363 POST http://127.0.0.1:8000/mylist/api/scrap/parse/ 404 (Not Found)
```
이번에 발생한 오류는 보내는 요청은 <span style='color:orange'>/api/scrap/parse/</span> 인데 브라우저가 요청을 <span style='color:orange'>/mylist/api/scrap/parse/</span>와 같이 인식하고 있기 때문이다.

fetch함수 경로 작성시 제일 앞 절대경로 / 를 붙여주지 않아서 해당 페이지의 default 경로인 mylist/가 붙어서 api가 요청됨

<br>

### 📌 해결
fetch함수 경로 작성 시 아래와 같이 코드를 수정
```javascript
// 변경 전
fetch('api/scrap/parse/', data)

// 변경 후
fetch('/api/scrap/parse/', data)
```

<br>

## 3-3. Django에서 "POST"방식 api 요청 시 CSRF토큰 필요
"GET"방식을 "POST"방식으로 변경 후 HTTP 요청 시 필요한 데이터를 할당하여 전달하였음에도 불구하고 다시 아래와 같은 오류가 발생하였다. 

<br>

### 🔖 오류
```bash
`toolbar.js:363  POST http://127.0.0.1:8000/api/scrap/parse/ 403 (Forbidden)toolbar.js:365`

`1. *{detail: 'CSRF Failed: CSRF token missing or incorrect.'}*
    1. **detail**: "CSRF Failed: CSRF token missing or incorrect."
    2. [[Prototype]]: Object`
```

위와 같은 오류가 발생한 이유는 Django에서는 api를 "POST"방식으로 요청 시 CSRF토큰이 필요하다는 것이다. 

<br>

### 📌 해결
HTTP요청 데이터에서 header에 csrf토큰 값을 보내줄 수 있게 공통함수 작성 후 data할당 시 추가하여 request를 요청하겠다.

```javascript
function getCookie(name) {
    // 얻어오고 싶은 cookie명을 인자값으로 보내어 cookie값 얻어 내는 공통 함수

    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {

        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function saveSitebyToolbar () {
    /* toolbar URL 저장 클릭 이벤트 */

    const btnToolbarSave = getElement('.add-button');
    
    btnToolbarSave.addEventListener('click', () => {

        let inputUrlValue = getElement('.add-input').value;

        const data = {
            method  : "POST",
            headers : {
                        'content-type' : 'application/json',
                        'X-CSRFToken'  : getCookie("csrftoken"),
                        },
            body    : JSON.stringify({"url": inputUrlValue})
            }
        
        fetch('/api/scrap/parse/', data)
            .then(response  => response.json())
            .then(result    => console.log(result))
            .catch(error    => console.log(error))
    })
}
```

위와 같이 공통함수 getCookie()를 만든 headers에 얻어온 csrf데이터를 추가해 주었다.<br>

*csrf토큰에 대한 글은 따로 작성 예정이다.

<br>


## 4. Server request를 POST로 받을 수 있게 코드 수정
요청 방식을 Client에서만 변경한다고 해서 "POST"방식의 api요청이 완료된 것이 아니라 Server에서도 코드를 수정해 줘야한다. 만약 Client에서만 코드를 변경하고 Server는 수정을 하지 않았다면 아래와 같은 오류가 나올 것이다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2b6c6cf5-f4a0-46fb-b8eb-b9077d6334ee/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221227T094704Z&X-Amz-Expires=86400&X-Amz-Signature=4b135494a2f4ff29749e6653ce4ba29d781ac932c1275ffa8d9fd4ae7447b5dc&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

### Server 수정 전
```python
class ParseAPIView(APIView):
    @scrap_decorator
    def get(self, request, **kwards):
        result: dict = {}
        video_type, title, image, url = '', '', '', ''
        try:
            # 접근 여부(데코레이터를 통해 반환)
            if kwards['access']:

                request_url: Response   = requests.get(kwards['url'], allow_redirects=False)
                request_url.encoding    = request_url.apparent_encoding
        
                # html 객체로 변환  
                web: BeautifulSoup      = BeautifulSoup(request_url.text, 'html.parser')    
                if web.find("meta", property="og:type"):
                    video_type = web.find("meta", property="og:type")['content']

                if web.find("meta", property="og:url"):
                    url = web.find("meta", property="og:url")['content']

                if web.find("meta", property="og:title"):
                    title = web.find("meta", property="og:title")['content']
                elif web.find("meta", property="og:site_name"):
                    title = web.find("meta", property="og:site_name")['content']

                if web.find("meta", property="og:image"):
                    image = web.find("meta", property="og:image")['content']
                else:
                    image = ''
                
                # title과 url이 없으면 저장 불가
                if title != '' and url != '':
                    content: str = self.parse(web)

                    with transaction.atomic():
                        '''트랜젝션 시작'''

                        user: User = User.objects.filter(name='조정용')
                        
                        if user.exists():
                            user = user.last()

                        site = Site.objects.create(
                            title           = title,
                            user            = user,
                            category        = 0,
                            url             = url,
                            host_name       = urlparse(url).hostname,
                            thumbnail_url   = image,
                            favorite        = False,
                            video           = False if video_type == 'article' else True,
                            content         = content
                        )

                    return Response({'msg':'Success save that web site', 'status':status.HTTP_200_OK})

                else:
                    return Response({'msg':'Do not save that web site', 'status':status.HTTP_202_ACCEPTED})

            else:
                return Response({'msg':'Do not access that web site', 'status':status.HTTP_202_ACCEPTED})
                                
        except SyntaxError as s:
            return Response({'msg':f'Save list process SyntaxError that Class ParseAPIView: {s.args}', 'status':status.HTTP_400_BAD_REQUEST})

        except NameError as n:
            return Response({'msg':f'Save list process NameError that Class ParseAPIView : {n.args}', 'status':status.HTTP_400_BAD_REQUEST})
            
        except KeyError as k:
            return Response({'msg':f'Save list process KeyError that Class ParseAPIView : {k.args}', 'status':status.HTTP_400_BAD_REQUEST})

    def parse(self, web: object) -> str:
        ''' 
        html 파싱 
        '''

        try:
            html: str = str(web.main)

        except Exception as e:       
            raise RuntimeError('Function parse Exception error that Class ParseAPIView : {e.args}')
        
        return html
```

위의 코드는 APIView를 상속 받아 내부 메소드를 get으로 작성했는데 post로 변경 후 다시 시도해 보자

<br>

### 🔖 오류
```bash
Internal Server Error: /api/scrap/parse/
Traceback (most recent call last):
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/django/core/handlers/exception.py", line 47, in inner
    response = get_response(request)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/django/core/handlers/base.py", line 181, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/django/views/decorators/csrf.py", line 54, in wrapped_view
    return view_func(*args, **kwargs)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/django/views/generic/base.py", line 70, in view
    return self.dispatch(request, *args, **kwargs)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/rest_framework/views.py", line 509, in dispatch
    response = self.handle_exception(exc)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/rest_framework/views.py", line 469, in handle_exception
    self.raise_uncaught_exception(exc)
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/rest_framework/views.py", line 480, in raise_uncaught_exception
    raise exc
  File "/Users/cjy/Lecture/Devket/env-devket/lib/python3.10/site-packages/rest_framework/views.py", line 506, in dispatch
    response = handler(request, *args, **kwargs)
  File "/Users/cjy/Lecture/Devket/pocket/decorator.py", line 14, in exec_func
    if access(scheme(slash(url)), header):
  File "/Users/cjy/Lecture/Devket/pocket/decorator.py", line 34, in slash
    url = url if url[-1] == '/' else f'{url}/'
TypeError: 'NoneType' object is not subscriptable
```
오류가 발생하는 문구를 읽어보니 decorator.py에서 오류가 발생하였다. 오류 내용은 이전에 "GET"방식으로 코드를 작성하여 요청 데이터를 전송하다 보니 받는 방식도 "GET"방식으로 받고 있어 오류가 발생한 것이다. decorator.py의 <span style='color:orange'>scrap_decorator</span>함수를 수정해야한다.

<br>

### 📌 해결
```python
from rest_framework.response import Response
from functools import wraps
import urllib.robotparser
import re

def scrap_decorator(func):
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    validation: object = re.compile('^(https|http)')

    @wraps(func)
    def exec_func(self, request) -> func:
        # path 파라미터 -> request body 파라미터로 절달 변경
        url: str = self.request.data.get('url')

        if access(scheme(slash(url)), header): 
            # Issue : scheme가 붙어있지 않으면 파싱 불가
            return func(self, request, url=scheme(url), access=True)
        else:
            # Issue : 데코레이터에서 return 값을 http가 들어있지 않은 함수를 return 할 경우 에러 발생
            return func(self, request, url=scheme(url), access=False)
    
    ...
    return exec_func
```
위 코드의 exec_func메소드의 url 데이터를 request body 데이터 받는 방식으로 수정해 주었다.
```python
# 변경 전
url: str = self.request.GET['url']

# 변경 후
url: str = self.request.data.get('url')
```

<br>

## 5. 결과
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9c44013a-dd4d-4a46-af09-2b446fa8b151/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221227T095737Z&X-Amz-Expires=86400&X-Amz-Signature=34100cb5db45abf40c627ddc5a96f4e70e4095b88316cd70ec807e3be427dcba&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
