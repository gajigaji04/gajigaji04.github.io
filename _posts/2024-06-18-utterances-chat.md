---
title: utterances 댓글 기능 추가하기
description: >-
  utterances 댓글 기능 추가 및 다크 모드 구현
# author: gajigaji04
date: 2024-06-18 16:18:00 +0800
categories: [git & github, github.io]
tags: [github.io, utterances]
---

# utterances란?

웹페이지 경로를 기준으로 깃헙 이슈를 만들어 댓글을 관리하는 라이브러리이다.

utterances가 특정 페이지에서 실행되면 다음과 같은 역할을 한다.

- 화면에 댓글 입력 폼을 그린다.
- 여기에 댓글을 입력한면 해당 페이지의 깃헙 이슈에 댓글을 추가한다.
- 깃헙 이슈에 잇는 모든 댓글을 해당 페이지에 그린다.

자세한 것은 <https://utteranc.es> 참고

## utterances로 github.io에 댓글창 추가하기

1. issue를 저장할 Github Repository를 Public으로 생성

private로 생성할 경우 다른 사람들은 issues에 있는 댓글을 볼 수 없다.

![2024-06-18](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/45ab957b-f0d0-4239-ae81-8fde45a3f517)

2.  Utterances Github App 설치하기
    <https://github.com/apps/utterances>

    ![2024-06-18 (2)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/60f1f709-4289-4f80-a9c5-cb8c20e52478)

    Github App에서 Utterances를 설치해야 한다.

    > 이미 설치한 경우 Configure버튼이 보인다. 처음 설치하는 경우는 Install 버튼이 보일 것이다.

    ![2024-06-18 (2)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/60f1f709-4289-4f80-a9c5-cb8c20e52478)

3.  Install 후 저장소 선택
    댓글을 이슈로 관리할 저장소를 선택한다.

    ![2024-06-18 (16)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/7e8bddc3-26a6-4e09-b559-a8292f923a3f)

4.  설치 후 설정 페이지에서 저장소 설정
    ![2024-06-18 (18)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/959f2790-c9ec-4850-bf64-147d9fcd3da7)

    > repo에 `계정명/저장소이름` 을 입력

    ![2024-06-18 (19)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/37268e65-a6d4-4891-b815-04a3fa91e2d7)

5.  설정 후 스크립트 복사
    설정을 무사히 완료한다면 페이지 아래에서 해당 스크립트를 복사한다.

6.  \_layout/post.html에 추가
    제일 맨 밑에 해당 스크립트를 복붙한다.
    ![2024-06-18 (20)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/5c1a634e-46d1-4c4d-9c56-16d790b8a0df)
    ![2024-06-18 (22)](https://github.com/gajigaji04/gajigaji04.github.io/assets/132813209/813d5463-0e33-48a7-98f1-c7f14a326655)

7.  댓글창 구현 확인

구현 후 댓글창이 작동하는 것을 볼 수 있다.
