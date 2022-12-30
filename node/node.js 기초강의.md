# Node.js 백엔드 기초강의
이 기초강의 내용은 유튜브 조코딩 JoCoding님의 "한시간만에 Node.js 백엔드 기초 끝내기(ft. API구축)"이라는 제목을 가진 Node.js의 기본영상이다. 길이는 1시간 정도로 Node.js가 무엇이고 어떻게 사용되는지 알아보기 위해 부트캠프 수료식 가는 지하철에서 1시간정도 가볍게 봤었는데 Node.js를 시작하기 좋은 강의라 생각이 들어 다시 한번 시청하면서 강의 내용을 정리해 보려고 한다.

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
 3. 디폴트 버전을 설정하거나 / 설치한 버전들의 전체 리스트를 확인하거나 / 필요 없는 버전을 삭제하는 등 소위 버전 관리가 쉬워진다.
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