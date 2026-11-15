---
title: "Integrating razorpay into your webapp"
description: "Plainwhite 테마에 포함되어 있던 샘플 글입니다."
date: 2019-03-23T21:03:36+05:30
category: JavaScript
tags: [javascript, nodejs]
slug: integrating-razorpay
# Plainwhite 테마의 샘플 글 — 기존 URL 유지를 위해 옮겨 둔 예시 콘텐츠입니다. 필요 없으면 이 파일과 src/data/redirects.mjs 의 해당 줄을 지우세요.
sample: true
---
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse

```javascript
const Razorpay = require('razorpay');

let rzp = Razorpay({
	key_id: 'KEY_ID',
	secret: 'name'
});

// capture request
rzp.capture(payment_id, cost)
	.then(function (data) {
		return 2;
	})
```

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
