import collections

Card = collections.namedtuple('Card', ['rank', 'suit'])

class FrenchDeck:

    # 카드(숫자) 2~11 + J, Q, K, A
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')

    # 카드(모양) spades, diamonds, clubs, hearts
    suits = 'spades diamonds clubs hearts'.split()

    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits
                                        for rank in self.ranks]
    
    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]

# __len__ 내장 인터프리터 구현
deck = FrenchDeck()
len(deck)

# __getitem__ 내장 인터프리터 구현
deck[0]
deck[-1]

# 랜덤으로 카드를 선택하는 함수를 만들지 않아도 내부 메서드 choice를 사용할 수 있다.
from random import choice

choice(deck)
choice(deck)
choice(deck)

# 슬라이싱 자동 지원
deck[:3]
deck[12::13]

suit_values = dict(spades=3, hearts=2, diamonds=1, clubs=0)

def spades_high(card):
    rank_value = FrenchDeck.ranks.index(card.rank)
    return rank_value * len(suit_values) + suit_values[card.suit]

for card in sorted(deck, key=spades_high):
    print(card)