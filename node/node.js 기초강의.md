# Node.js 백엔드 기초강의
이 기초강의 내용은 유튜브 조코딩 JoCoding님의 "한시간만에 Node.js 백엔드 기초 끝내기(ft. API구축)"이라는 제목을 가진 Node.js의 기본영상이다. 길이는 1시간 정도로 Node.js가 무엇이고 어떻게 사용되는지 알아보기 위해 부트캠프 수료식 가는 지하철에서 1시간정도 가볍게 봤었는데 Node.js를 시작하기 좋은 강의라 생각이 들어 다시 한번 시청하면서 강의 내용을 정리해 보려고 한다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/57686108-9dbf-49bf-b65c-1eaaad82b2df/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T124258Z&X-Amz-Expires=86400&X-Amz-Signature=a03aeeae3c78250cc395c25e092d0b8e7c3dde0d00d868fc80c14460c199a397&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

출처 : [조코딩 JoCoding -한시간만에 Node.js 백엔드 기초 끝내기(ft. API구축)](https://www.youtube.com/watch?v=Tt_tKhhhJqY)

<br>

## Node.js란 무엇인가?

지금 메인으로 사용하고 있는 python 언어는 컴퓨터에 설치해야 사용이 가능한 백엔드 언어이다. 하지만 javascript는 설치과정 없이 바로 사용이 가능하다. 그 이유는 javascript는 브라우저에 인터프리터가 있어 javascript를 읽어 실행이 되기 때문에 로컬에 설치 없이 바로 사용이 가능했던 것이다.

그런데 이제 javascript를 node.js 백엔드(서버)에서 작동하기 위해서는 node.js를 설치 해야 실행이 가능하다. 이렇게 Node.js를 사용하게 되면 브라우저를 띄울필요 없이 javascript를 사용할 수 있는 환경이 만들어 진다. 그러면 백엔드(서버)와 프로트(클라이언트) 모두 javascript로 구현이 가능해 진다.

<br>

이렇게 백엔드와 프론트 모두 개발할 수 있는 node.js를 어떻게 사용하는지 학습하기 전에 node.js가 무엇이며 어떠한 영향력을 가지고 있는지 알아보도록 하자. 현재 백엔드 개발에 사용되는 프레임워크는 언어마다 다양하고 많은데 그 중에서 Node.js는 상위권에 속한다.

<span style='color:orange;'>여기서 하나 집고 넘어가야할 부분이 node.js는 javascript처럼 개발에 사용하는 프로그래밍 언어가 아니라 javascript로 백엔드 개발이 가능하게 해주는 하나의 프레임워크라는 것을 알고 가자.</span>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0d880fc5-614f-42cb-8a5b-592b64c2166a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T111750Z&X-Amz-Expires=86400&X-Amz-Signature=23b0549302e76a09140a6ac39183bce557b0a2b89fd8bf4c6a15f9cb4ba3a660&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
출처 : [survey.stackoverflow.co](https://survey.stackoverflow.co/2022/#technology)

위의 그림은 stackoverflow에서 조사한 2022년 Web frameworks와 technologies부분 통계이며 Node.js가 47%이며 거의 50%에 임박하는 비중을 가지고 있는만큼 개발자들이 많이 사용하고 있는 프레임워크라는 것을 수치로서 보여준다.

<br>

## Node.js 설치
현재 시청하고 있는 강의는 Windows를 기준으로 설치과정을 설명하고 있으므로 Mac을 사용하고 있는 나는 Homebrew를 사용해서 node.js를 설치해 보겠다. Homebrew가 설치되어 있지 않으면 아래 블로그를 따라하면 Homebrew와 node.js를 설치하도록 하자.<br>
출처 : [Node.js 설치](https://memostack.tistory.com/274)

### NVM
 위 블로그를 따라하다 보면 NVM이라는 관리 도구를 설치하는데 "Node Version Manager"라고 하는 버전을 관리하는 도구이다.
 ```bash
 # 명령어
$ brew install nvm
 ```

### NVM, 왜 사용해야 하는가?
 협업을 할 때, 또는 다양한 프로젝트를 동시에 진행해야 할 때 다양한 라이브러리 / 프레임워크 / 개발툴의 버전 호환 문제를 겪기때문이다. NVM을 사용하면 여러 이점이 있는데 아래와 같다.<br>
 1. 컴퓨터에 다양한 버전의 Node.js를 설치할 수 있게 해준다.
 2. use 커맨드를 이용해 사용할 Node 버전으로 간단하게 스위칭할 수 있게 해준다.
 3. 디폴트 버전을 설정하거나 / 설치한 버전들의 전체 리스트를 확인하거나 / 필요 없는 버전을 삭제하는 등 소위 버전 관리가 쉬워진다.<br>

 루비의 rvm, rbenv나 파이썬의 pyenv와 같은 역할을 한다.
 
<br>

## nvm 환경변수 설정
 ```bash
 # 명령어
$ vim ~/.zshenv
 ```
 ```bash
 # 환경 설정 코드
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
 ```

<br>

## nvm 설치 확인
위의 과정이 끝났다면 nvm이 제대로 설치되었는지 확인해보자.
```bash
# 명령어
% nvm --version
```

<br>

## nvm으로 node.js설치
이제 nvm을 이용하여 node.js를 설치해보자<br>
ls-remote명령어로 설치할 수 있는 node.js버전을 확인할 수 있다.
```bash
# 명령어
% nvm ls-remote

v16.8.0
        v16.9.0
        v16.9.1
       v16.10.0
       v16.11.0
       v16.11.1
       v16.12.0
       v16.13.0   (LTS: Gallium)
       v16.13.1   (LTS: Gallium)
       v16.13.2   (LTS: Gallium)
       v16.14.0   (LTS: Gallium)
       v16.14.1   (LTS: Gallium)
       v16.14.2   (LTS: Gallium)
       v16.15.0   (LTS: Gallium)
       v16.15.1   (LTS: Gallium)
       v16.16.0   (LTS: Gallium)
       v16.17.0   (LTS: Gallium)
       v16.17.1   (LTS: Gallium)
       v16.18.0   (LTS: Gallium)
       v16.18.1   (LTS: Gallium)
       v16.19.0   (Latest LTS: Gallium)
        v17.0.0
        v17.0.1
        v17.1.0
        v17.2.0
```
확인한 버전에서 원하는 node.js버전을 선택하여 install 명령어로 설치할 수 있다.
```bash
# 명령어
$ nvm install 17.2.0
```

<br>

## NVM 기타 명령어
```bash
# node.js 버전 설치하기
$ nvm install 0.10
$ nvm install v0.1.2
$ nvm install v8

# node 최신 버전 설치 (설치 당시 기준)
$ nvm install node

# node LTS 최신버전 설치
$ nvm install --lts
```

```bash
# 설치된 node.js 목록 확인하기
$ nvm ls

# 설치할 수 있는 모든 Node 버전 조회 (재미삼아 해보지마세요 겁나많음... 황급히 control C 두드리기)
$ nvm ls-remote

# 특정 버전의 node 사용하기
$ nvm use <version>

# 현재 사용중인 버전 확인하기
$ nvm current

# node.js 설치 경로 확인하기
$ which node

# 필요없는 node 버전 삭제하기
$ nvm uninstall <version>
```

만약에 새로운 쉘을 실행할 경우 node의 버전이 system버전으로 리셋되는데, 이를 고정하기 위한 커맨드는 아래와 같다.
```bash
$ nvm alias default 8.9.4

# 설치되어 있는 가장 최신버전의 node를 디폴트로 사용하기
$ nvm alias default node
```

<br>

## 기존 javascript를 사용하던 환경
우리가 브라우저에서 javascript를 사용할 수 있는 이유는 아래와 같이 브라우저가 띄워진 상태에서 V8이라고 하는 자바스크립트 엔진이 javascript 코드를 실행하는 인터프리터(해석기)를 사용하여 코드를 읽기 때문이다.
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b99c0199-6def-469b-995b-3ffd4815076a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T121841Z&X-Amz-Expires=86400&X-Amz-Signature=199298ab637b8fd5da554dc0b4b15ae17d3d0142e75d26c182ba6eb0690bf342&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

이제 로컬 컴퓨터에서는 그런 환경이 갖춰져있지 않다가 이제 Node.js를 설치했기 때문에 실행할 수 있게 되었다.

<br>

## Node.js를 이용하여 javascript 사용해보기
```javascript
// index.js

console.log("Hello world!");
```
위와 같이 index.js파일을 생성 후 간단한 javascript코드를 입력하여 실행을 시켜 보았다. node.js 설치없이 실행하는 방법은 html파일을 브라우저로 띄운다움에 js파일을 import받아 javascript코드를 실행하거나 html파일에 script코드를 작성하여 실행시켜 주어야했다. 하지만 이제 위와 같이 입력한 코드를 <span style='color:orange;'>control + option + n</span>단축키를 이용하거나 teminal에 아래와 같이 node 명령어를 이용하여 실행 할 수 있다.
```bash
# 명령어
% node index.js
```

```bash
# 결과
[Running] node "/Users/cjy/Desktop/Source/Jupyter/node/index.js"
Hello world!

[Done] exited with code=0 in 0.106 seconds
```

위와 같이 실행결과를 확인하였다면 이제 node.js에서 javascript를 사용할 준비가 끝난 것이다.

<br>

## npm이란 무엇일까?

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d4541930-c8ec-494e-a052-78aa97433c16/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T124909Z&X-Amz-Expires=86400&X-Amz-Signature=365d7954f364eaa765b0d49747d63241af517d2709e545b174a3ce0ec9e8d4a3&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
출처 : [npm 사이트](https://www.npmjs.com/)

npm이란 "Node Package Manage"라고 하는 node 패키지 관리자라고 하는 필요한 툴을 다운받아 사용할 수 있는 사이트 이다.

<br>

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a86712a6-41c1-41f3-a23d-b47c54c4bf87/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T125116Z&X-Amz-Expires=86400&X-Amz-Signature=23b01ed3aa98c872754709797f2816bb873f1851c34354b05c65edf77c750a4c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
출처 : [모듈 개수 통개](https://blog.humphd.org/howto-first-github-pr/)

node에 이미 사용할 수 있는 모듈은 수도 없이 많은데 아래 통계를 보면 npm의 모듈 개수가 압도적으로 많은 것을 확인 할 수 있다.

### figlet 사용하기 (임의 모듈 학습-건너뛰어도 무관)
figlet은 아래와 같이 텍스트를 이용하여 그림을 표현하는 "아스키 아트"라는 것을 사용하게 해주는 모듈이다. 해당 설명은 아래 그림과 같이 설치하는 명령어와 간단한 사용 코드가 나와 있으니 따라해 보자.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/38dfbc20-9595-4975-8d19-3b57cd10473c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T125703Z&X-Amz-Expires=86400&X-Amz-Signature=995ea591fae6d87f47ee00da14c680da30ba3df5ecfd92ba61a681a891899a60&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)|![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/275fb759-547e-4b39-87f8-f7ce8591f3c1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T130239Z&X-Amz-Expires=86400&X-Amz-Signature=e6cb636f46cd726341d0283f6690850d7654c6cf8cf33b976460e56e57e55b91&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
--- | --- | 

아래와 같이 index.js파일에 입력 후 실행시켜 보면 내가 입력한 문자열을 아스키 아트로 출력해 주는것을 볼 수 있다.
```javascript
var figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
```

```bash
[Running] node "/Users/cjy/Desktop/Source/Jupyter/node/index.js"
  _   _      _ _         _   _           _         _      __        __         _     _ _ _ 
 | | | | ___| | | ___   | \ | | ___   __| | ___   (_)___  \ \      / /__  _ __| | __| | | |
 | |_| |/ _ \ | |/ _ \  |  \| |/ _ \ / _` |/ _ \  | / __|  \ \ /\ / / _ \| '__| |/ _` | | |
 |  _  |  __/ | | (_) | | |\  | (_) | (_| |  __/_ | \__ \   \ V  V / (_) | |  | | (_| |_|_|
 |_| |_|\___|_|_|\___/  |_| \_|\___/ \__,_|\___(_)/ |___/    \_/\_/ \___/|_|  |_|\__,_(_|_)
                                                |__/                                       

[Done] exited with code=0 in 0.145 seconds
```

<br>

## 다운로드 받은 모듈 정리
사용자가 npm으로 다운받은 모듈을 정리해 주는 명령어이며 아래와 같이 입력하면 <span style='color:orange;'>package.json</span>파일이 생성된다. 또한 npm install [모듈명]으로 모듈을 설치하고 나면 <span style='color:orange;'>[프로젝트 폴더명]_modules</span>라는 폴더와 <span style='color:orange;'>package-lock.json</span>이 새로 생성이 되는데 package.json은 파일의 간략한 리스트를 보여준다면 package-lock.json은 다운로드한 모듈의 상세 정보가 들어있는 파일이다.
```bash
# 명령어
npm init
```
```json
// package.json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

<br>

## Express란 무엇인가?
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d3802ab7-3eb1-40e0-b161-1beecbe7eb04/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T133010Z&X-Amz-Expires=86400&X-Amz-Signature=d6b2c202a7da76d3fa069a4bd0dca1b7d42d804f222f368a5269160c650b224b&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
Node.js 기반의 웹 프레임워크를 만드는 것이 Express모듈이라고 한다. 위와 같이 왼쪽의 웹 브라우저에서 요청한 request를 db와 그 외 처리 과정을 거친 후 웹브라우저로 응답 response를 주는 역할을 하는 것을 웹 프레임워크의 역할이라고 할 수 있다. 이런 역할을 하는 것이 Express이다.

<br>

## express 사용 하기
```bash
# 명령어
npm install express
```

```javascript
// index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
출처 : [expressjs](https://expressjs.com/ko/starter/hello-world.html)

위와 같이 express를 설치한 후 npm사이트에 적혀있는 예제 코드를 index.js파일에 붙여 준 후 실행을 시켜보자. 처음에는 반응이 없을 것이다. 일단 코드를 설명하기 전에 브라우저에서 localhost:3000로 url을 입력하여 이동해 보자. 그러면 아래와 같이 브라우저가 이동하는 것을 볼 수 있을 것이다.
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8b84e681-f17a-4e00-b723-2876c7dffc79/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T134331Z&X-Amz-Expires=86400&X-Amz-Signature=c3b9171df361af18f984ae4850046b6301499e539f65de68364d14150e37ad07&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

<br>

### require
```javascript
const express = require('express')
const app = express()
```
위의 내용은 require이라는 함수를 이용하여 설치한 express라는 모듈을 "express"라는 변수에 할당해 주는 코드이다.
### port / listen
```javascript
const port = 3000

app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})
```
3000 이라는 번호로 접속할 수 있게 포트라는 것을 열어주기위해  포트값을 열어 준것이다.
app.listen이라는 것을 통해 그 설정한 값을 받은 것이다. 이 listen은 항상 실행되고 있는 상태라고 생각을 하자.

### get
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```
위에는 express함수를 실행한 app이라는 객체에 get을 사용하였고, 이 안에 매개변수로 '/'와 (req, res) => { res.send('Hello World!') } 콜백함수를 넣어 주었다.
1. <strong style='color:orange;'>get</strong> (HTTP 메소드)
- HTTP 메소드로서 클라이언트에서 서버로 요청을 보낼때 사용하는 방식이며 get, post, delete, put... 등의 다양한 메소드가 존재한다.
2. <strong style='color:orange;'>'/'</strong> (라우팅)
- 위에서 설명한 열어준 port로 들어오는 다양한 api 경로를 의미한다.
3. <strong style='color:orange;'>(req, res) => { res.send('Hello World!') }</strong> (콜백함수)
- 끝나고 실행할 함수라고 이해하자.
- [콜백함수란?](https://laagom.tistory.com/16)

아까 위에서 localhost:3000으로 브라우저에 입력을하여 'Hello World!'가 나오는 페이지로 이동을 한것을 보았는데 이제 위의 코드가 브라우저에 어떠한 역할을 했는지 알 수 있을 것이다.

<br>

## api 별로 분기하여 라우팅 생성
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/dog', (req, res) => {
    res.send('멍멍')
})

app.get('/cat', (req, res) => {
    res.send('<h1>야옹</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
위와 같은 코드를 작성하여 아래와 같이 라우팅을 나눠 보았다.<br>
- '/'로 접속했을 때는 "Hello World!"<br>
- '/dog'로 접속했을 때는 "멍멍"<br>
- '/cat'로 접속했을 때는 "야옹'"<br>

<h3 style='color:orange;'>Point!!</h3>
'/cat'라우팅에서 html형식의 문자열을 보내면 화면에 h1 태그가 적용되며 화면에 출력되는 것을 확인 할 수 있을 것이다. 여기서 우리는 res.send()에 html도 사용이 가능한 사실을 알 수 있다.

<br>

## response에 변수를 담아 보내기
### GET: params, query
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c77cd6bb-a755-41f0-ab2d-bce1517b74d6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T143937Z&X-Amz-Expires=86400&X-Amz-Signature=d894c0ecad4a8d70fb42670c0b588cefa1940da2e2b120adebfaae657850bf99&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)|![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/17b88207-79ef-4ec9-ac64-d7599a95e280/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T144042Z&X-Amz-Expires=86400&X-Amz-Signature=47e12f83f96844c181e942cadb0c7b160341b2e35f00e3ee2f86d78b1792c17a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
--- | --- |

위의 그림의 브라우저 경로를 보면 youtube.com/[유튜브 계정 명칭]으로 주소가 설정되어 있다. 하지만 유튜브를 개발할때 모든 유튜브 계정에 위와 같이 api를 만들지는 않았을 것이다. 해당 계정에 접속하는 이벤트가 이루어졌을 때 해당하는 계정 명칭의 id값이 라우팅에 param으로 보내졌고 동일한 api로 들어와 param값으로 조회되는 로직을 분기처리했을 거라고 예상한다

그러면 우리는 브라우저 url에 param으로 id를 보내고 param값에 따라 다른 문자열이 출력되는 api 라우팅을 작성해 보자.

<br>

### param
 ```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/user/:id', (req, res) => {
    const param = req.params
    console.log(param)
    console.log(param.id)

    res.json({'animal': param.id})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
위의 로직은 '/user/:id'와 같이 라우팅을 설정하여 [id]에 대한 param 받을 수 있게 작성하였다. 그리고 받은 param을 화면에 출력되게 param.id로 param에 담겨있는 id 값을 꺼내서 json형식으로 response에 보내주었다.

```bash
# 브라우저 주소
http://localhost:3000/user/고양이
```
와 같이 브라우저에 주소값을 입력하면 아래와 같이 출력되는 것을 볼 수 있다. /user/:id 뒤에 붙은 id라는 param값이 api를 거쳐서 출력되게 구현한 것이다. 물론 해당 api에서 db처리가 되지 않지만 param에 따라 다른 결과가 다르게 구현이 되는것을 확인하였다.
```bash
# 결과
{"animal":"고양이"}
```

<br>

### query
위에서는 param을 이용해서 라우팅을 이용했다면 이번에는 query를 이용하여 request로 요청한 결과를 출력해보겠다.
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/user/query', (req, res) => {
    const query = req.query
    console.log(query)

    res.json(query)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
위와 같이 보낼때 마다 param값이 변하는게 아니라 query를 통해서 결과값을 다르게 출력을 하게 코드를 작성해 보았다.
```bash
http://localhost:3000/user/query?name=Lagom&age=31&addr=Seoul
```
위와 같이 /user/query로 라우팅을 설정하고 뒤에 ?name=Lagom&age=31&addr=Seoul으로 쿼리를 설정하여 보내게 되면 화면에는 아래와 같이 url로 보낸 query값이 출력되는 것을 확인 할 수 있다.
```bash
{"name":"Lagom","age":"31","addr":"Seoul"}
```

<br>

## name에 따라 다른 sound값을 출력하기
### GET /sound/:name
이전에는 이력한 url의 param값, 즉 id값을 다르게 입력하면 입력한 id값이 출력되게 구현을 하였다. 이번에는 전달받은 param값에 따라 출력되는 값을 param값이 아닌 다른 값으로 보여지게 코드를 구현해 보겠다.
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/sound/:name', (req, res) => {
    const { name } = req.params

    if(name == 'dog') {
        res.json('멍멍')
    }else if(name == 'cat') {
        res.json('야옹')
    }else if(name == 'pig') {
        res.json('꿀꿀')
    }else{
        res.json('알수 없음!!')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
위와 같이 전달받은 param에 대한 name값을 변수로 할당하여 변수로 dog, cat, pig, 그 외로 하여 분기를 걸어 결과값을 다르게 출력하게 구현하였다.
```bash
http://localhost:3000/sound/dog

http://localhost:3000/sound/cat

http://localhost:3000/sound/pig

http://localhost:3000/sound/나
```
위와 같이 각각 다른 url을 브라우저에 입력하게 되면 아래와 같이 해당하는 동물에 대한 울음소리가 출력될 것이다.
```bash
"멍멍"

"야옹"

"꿀꿀"

"알수없음!!"
```

<br>

## CORS이슈

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9429cb10-c414-4883-a025-e7cf97aea2f8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T161437Z&X-Amz-Expires=86400&X-Amz-Signature=06be85b4e49dde4ca159e7b60e2bc8919752b0ff18b8ce476b1dd3ae9e31dd14&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

HTML파일에서 node.js또는 다른서버에 request를 요청을 보냈을 때 서버에서는 이상한 곳 또는 위험한 요청이 올 수 있기 때문에 기본적으로 요청을 막게되어 있다. 그래서 HTML로 요청을 할때 CORS설정이 없으면 차단이 된다. 이것은 django에서 static파일을 s3로 storages를 연결할때도 발생했던 이슈이다. 이 이슈사항에 대한 것은 프로젝트 이슈사항을 정리할 때 다시 다뤄 보겠다.

## 프론트 엔드 CORS 연결
### COSR 모듈 설치 및 연결
```bash
# 명령어
npm install cors
```

```javascript
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
```
위와 같이 require('cors')로 변수를 할당한 수 app.user(cors())로 하여 cors연결을 해결할 수 있게 코드를 작성하였다.

### HTML request요청 화면 구현
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cors 이슈 해결</title>
</head>
<body>
    <input type="text" id="name">
    <button onclick="getSound()">API 요청</button>
    <script>
        function getSound() {
            const name = document.getElementById('name').value
            fetch(`http://localhost:3000/sound/${name}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById('name').value = data
            })
        }
    </script>
</body>
</html>
```
위와 같이 input박스에 dog, cat, pig값을 입력했을 때 아까 위에서 작성한 서버 api로 fetch함수를 통해 요청을 보내게 스크립트를 작성했다. dog, cat, pig값에 따라 나오는 울음 소리가 다시 input박스에 값이 입력되게 구현해 보았다.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d1b3463d-e612-4f1c-a9c2-42a578004038/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T163443Z&X-Amz-Expires=86400&X-Amz-Signature=e9c500d1c0cbc4eba955b84333c8e899b575933e606e9a6739eec663d903612a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/baca8376-f277-416c-9ad6-7dfb8bc61517/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T163513Z&X-Amz-Expires=86400&X-Amz-Signature=fc492d4ca1337dd90dedfceb7cecc72fc119991b318879da07e65a58e2dbca0f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

위와 같이 cat을 입력한 후 API 요청 버튼을 누르면 구현했던 라우팅에 대한 api 서버단을 거쳐서 야옹값을 받아 input에 랜더되는 것을 확인할 수 있다.

<span style='color:orange;'>결과적으로 다른 HTML에서 요청을 보내도 CORS이슈가 발생되지 않는 것을 확인 하였다.</span>