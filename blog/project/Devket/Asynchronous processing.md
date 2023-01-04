# [22.11.20] Asynchronous processing 비동기 처리 방식
자바스크립트에서 fetch 함수를 이용해서 서버와 통신을 하게 클라이언트단을 개발하고 있다. 

<br>

## fetch()함수 비동기처리로 인한 문제 발생
### 📌 문제의 코드
```javascript
function deleteBulkSelectedSite(){
    /* bulk 삭제 이벤트 */

    if (selected_articles.length > 0){
   
        if(confirm('선택한 항목을 삭제하시겠습니까?')){

            let data = setFechData("DELETE", {pk_ids: selected_articles, user: 'User Id'})

            fetch(`/api/sites/bulk`, data)
                .then(response => {
                    let status = response.status

                    if (status == 200)
                        alert('삭제에 성공하였습니다.')                    
                })
                .then(() => getSiteList())
                .then(() => changeSelected())
                .catch(error   => console.log(error))
        }      
    }
}

function getSiteList(word='') {
    /* 각 탭에 해당되는 모든 항목들을 조회하여 함수 */
    
    // 선택한 탭 활성화하기  
    makeActive()

    // 해당되는 항목들 조회하기  
    fetch(`${apiURL[apiUrlKey]}?word=${word}`)
        .then(response => response.json())
        .then(data => {
            mapPosts(data)
        })
        .catch(err => {
            console.log(err);
        })
}

function changeSelected() {
    const bottomToolbarConatiner = getElements('.i18uycg6')

    bottomToolbarConatiner.forEach(element => {
        element.classList.toggle('bulkEdit')

        let bottomToolbar     = element.querySelector('.item-actions')
        let bulkToolbar       = element.querySelector('.item-bulk-select')
        let selectedDotChoice = element.querySelector('.item-bulk-select>.i1qqph0t>.select-icon-svg>.select-dot-choice')
        let article           = element.closest('article')

        bottomToolbar.classList.toggle('off')
        bulkToolbar.classList.toggle('off')
        selectedDotChoice.classList.add('off')
        article.classList.remove('selected')
    })
}
```
위의 함수는 특정 버튼을 클릭했을 때 발생하는 이벤트이다. 현황 화면에서 조회된 항목을 선택 후 선택된 항목들을 삭제해주는데, 삭제가 완료된 후 then()에서 그 응답을 받아 다시 한번 현황 데이터를 조회하는 함수 getSiteList()를 호출한다. 두번째 then()에서는 첫번째 then()에서 조회된 현황화면에 css로 동적인 변화를 주는 함수 changeSelected()를 호출한다.하지만 현재 코드로 이벤트를 발생시키면 데이터 삭제 후 재조회는 되지만 changeSelected()함수가 적용되지 않는 문제가 발생하였다. 

<br>

### 📌 문제 파악
위의 코드에서 두번째 then()에서 호출한 changeSelected()가 적용되지 않은 이유는 첫번째 then()에서 호출하고 있는 getSiteList()함수안의 fetch함수가 비동기로 작동되고 있기 때문이다. getSiteList()안의 fetch()는 비동기로 진행되고 있기 때문에 아직 완료가 되지 않은 시점에서 changeSelected()함수가 실행되다 보니 getSiteList()에서 현황화면의 DOM이 생성된 후 생성 된 DOM에 작동하는 changeSelected()함수가 적용되지 않는 것이다.

<br>

### 📌 해결 코드
```javascript
// 비동기로 조회 되면 앞의 생성되는 DOM을 읽지 못하므로 동기처리

async function getSiteList(word='') {
    /* 각 탭에 해당되는 모든 항목들을 조회하여 함수 */
    
    // 선택한 탭 활성화하기  
    makeActive()

    // 해당되는 항목들 조회하기  
    await fetch(`${apiURL[apiUrlKey]}?word=${word}`)
        .then(response => response.json())
        .then(data => {
            mapPosts(data)
        })
        .catch(err => {
            console.log(err);
        })
}
```
await/async를 사용하여 Promise 받아 진행할 수 있게 getSiteList()앞에 async를 붙여준 후 fetch()에 await를 추가하였다. 비동기로 위의 코드가 진행되며 다음 코드를 진행시키는 것이 아니라 결과를 받은 후에 다음을 진행할 수 있게 수정해 주었다.

<br>

## 결과
fetch()함수는 비동기로 작동이 되어 다른 작업이 백그라운드로 진행되고 또 다른 작업이 진행되는 것은 빠르고 효율적이지만 백그라운드에서 진행되는 작업과 다른 작업이 의존성이 있어서 작업 결과에 따라 그 작업에 영향을 주는 코드에는 비동기로 작동되는 것이 치명적이라는 것을 알게 되었다.

아직 await/async를 사용하여 Promise를 받아 비동기 처리를 어떻게 제어하는지 정확하게 판단이 되지 않아 구글링을 통해 해결을 하였지만 javascript 비동기 처리 방식을 학습하여 다시 블로그를 작성하도록 하겠다.

