# Data Structure-Hash(해시)
파이썬에서 Hash(해시)는 어떻게 구현을 해야할까?
Hash(해시)구조는 파이썬에 Dictionary라는 자료구조를 통해 해시를 제공한다. 그리고 Dictionary는 dict클래스에 구현되어있다.

<br>

## Hash(해시)를 언제 사용하면 좋을까?

### 📌 리스트를 사용할 수 없을 때
리스트는 숫자 인덱스를 이용하여 원소에 접근하는데 list[1]은 접근이 가능하지만 list['a']는 접근이 불가능하다. 인덱스 값이 아닌 문자열을 이용하려고 할때 딕셔너리를 사용하면 좋을 것이다.

<br>

### 📌 빠른 접근 / 탐색이 필요할때
아래에서 표로 정리해 놓았지만, 딕셔너리 함수의 시간복잡도는 대부분 O(1)이므로 아주 빠른 자료구조이다.

<br>

### 📌 집계가 필요할 때
원소의 개수를 세는 문제는 코딩 테스트에서 많이 출제되는 문제이다. 이때 해시와, collections 모듈의 Counter클래스를 사용하면 아주 빠르게 문제를 풀 수 있을 것이다.

<br>

## 딕셔너리와 리스트의 시간 복잡도 차이
위의 설명에서 딕셔너리의 시간 복잡도는 대부분 O(1)을 갖는다고 했다. 아래 표를 이용하여 리스트와 시간복잡도를 비교해 보자.

|Operation|Dictionary|List|
|---------|----------|----|
|**Get Item**|O(1)|O(1)|
|**Inser Item**|O(1)|O(1)~O(N)|
|**Update Item**|O(1)|O(1)|
|**Delete Item**|O(1)|O(1)~O(N)|
|**Search Item**|O(1)|O(N)|

List에 비해 Dictionary가 매우 빠른 시간복잡도를 갖는 것을 볼 수 있다. 즉, 원소를 넣거나 삭제, 찾는 일이 많을 때에는 딕셔너리를 사용하는 것이 좋다.

<br/>

## Dictionary 사용법
### 📌 Init
{}를 사용하거나 dict함수 호출 시 빈 딕셔너리를 선언할 수 있다. key-value쌍을 갖는 dictionary선언도 바로 가능하다.
```python
# 빈딕셔너리 생성
dict1 = {}
dict2 = dict()
```
```python
# 특정 key-value쌍을 가진 dictionary 선언
Dog = {
    'name': '군밤',
    'weight': '4',
    'height': '100'
}
```
```python
# dictionary를 value로 가지는 dictionary 선언
Animals = {
    'Dog' : {
        'name': '군밤',
        'weight': '4',
        'height': '100'
    },
    'Cat' : {
        'name': '먀오',
        'weight': '2',
        'height': '65'
    }
}
```

<br>

### 📌 Get
1. [] 사용하기
2. get 메소드 이용하기

get메소드는 get(key, x)로 이용할 수 있다. 이는 '딕셔너리에 key가 없는 경우, x를 리턴'라는 용도이다. 딕셔너리를 카운터하는 (집계)경우에 get함수가 유용하게 사용된다.
```python
# [] 기호 사용해 원소 가져오기
dict = {'하이': 300, '헬로': 180, 3: 5}
dict['헬로'] # 180
```
```python
# get 메소드를 이용해 원소 가져오기 1
# 딕셔너리에 해당 key가 없을때 Key Error를 내는 대신, 특정한 값을 가져온다.
dict = {'하이': 300, '헬로': 180}
dict.get('동동', 0) # 0
```
```python
# get 메소드를 이용해 원소 가져오기 2
# 물론, 딕셔너리에 해당 key가 있는 경우 대응하는 value를 가져온다.
dict = {'하이': 300, '헬로': 180}
dict.get('하이', 0) # 300
```

<br>

### 📌 Set
딕셔너리에 값을 집어넣거나, 값을 업데이트 할때 []를 사용한다.
```python
# 값 집어넣기
dict = {'김철수': 300, 'Anna': 180}
dict['홍길동'] = 100
dict #{'Anna': 180, '김철수': 300, '홍길동': 100}
```
```python
# 값 수정하기1
dict = {'김철수': 300, 'Anna': 180}
dict['김철수'] = 500
dict # {'Anna': 180, '김철수': 500}
```
```python
# 값 수정하기2
dict = {'김철수': 300, 'Anna': 180}
dict['김철수'] += 500
dict # {'Anna': 180, '김철수': 800}
```

<br>

### 📌 Delete
딕셔너리에서 특정 key값을 지울 때에 다음과 같은 방법을 사용할 수 있다.
1. **del dict_obj[key]**

del은 키워드로써, 만약 딕셔너리에 key가 없다면 keyError가 발생한다.

2. **pop(key[,default])**

pop은 메소드로써, pop메소드는 key 값에 해당하는 value를 리턴한다. key가 없다면 두번째 파라미터인 default를 리턴한다.<br/>

만약 default 설정하지 않았을 시엔 keyError가 발생한다.
```python
# del 이용하기 - 키가 있는 경우

dict = {'김철수': 300, 'Anna': 180}
del dict['김철수']

dict #{'Anna': 180}
```
```python
# del 이용하기 - 키가 없는 경우 raise KeyError
my_dict = {'김철수': 300, 'Anna': 180}
del my_dict['홍길동'] 
'''
keyError 발생!
'''
```
```python
# pop 이용하기 - 키가 있는 경우 대응하는 value 리턴
my_dict = {'김철수': 300, 'Anna': 180}
res = my_dict.pop('김철수', 180) # 300
print(res)
```
```python
# pop 이용하기 - 키가 없는 경우 대응하는 default 리턴
my_dict = {'김철수': 300, 'Anna': 180}
res = my_dict.pop('홍길동', 180) # 180
print(res)
```
```python
my_dict
```

<br>

### 📌 Iterate
딕셔너리를 for문을 이용하여 조회할 때 두가지 방법
1. key로만 순회하기
2. key, value동시 순회하기(items() 사용)
```python
# key로만 순회
dict = {'김철수': 300, 'Anna': 180}
for key in dict:
    print(key)
    # 이 경우 value를 찾고 싶으면 dict[key] 와 같이 접근을 따로 해주어야.

'''
김철수
Anna
'''
```
```python
# key-value 동시 순회
dict = {'김철수': 300, 'Anna': 180}
for key, value in dict.items():
    print(key, value)

'''
김철수 300
Anna 180
'''
```

<br>

## 그 밖에 딕셔너리 유용한 팁
### 📌 특정 key가 딕셔너리에 있는지 없는지 조회할 때 - in 사용
```python
dict = {'김철수': 300, 'Anna': 180}
print("김철수" in dict) #True
print("김철수" not in dict) # False
```

### 📌 key 또는 value만 뽑아내는 방법
```python
# key를 extract - keys 사용
my_dict = {'김철수': 300, 'Anna': 180}
my_dict.keys() # dict_keys(['김철수', 'Anna'])
```
```python
# value를 extract - values 사용
my_dict = {'김철수': 300, 'Anna': 180}
my_dict.values() # dict_values([300, 180])
```
```python
# key, value 쌍을 extract - items 사용
my_dict = {'김철수': 300, 'Anna': 180}
my_dict.items() # dict_items([('김철수', 300), ('Anna', 180)])
```