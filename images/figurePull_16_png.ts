/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACXCAYAAADQ8yOvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAGOVJREFUeNrsXQlwU/eZ/3Q+3Xq+b1sGB3ASgsNVCEmQ22wDOYpJS4/sTjC70yPdTgPT7U4m6ZbQ2aaTtrOGptOmaad20mmaNCWQ5ii0JAhSQi6CCQGDY7CwAd/y0308Hfv/nixZtiXZsh0sWf/fjMZPlvT0jp+++/v+ABQUFBQUFBQUFBQUFBQUFBQUFBQUFBRZAVEWnztbv1DdeEu1an25XspKxSKjXiERXrg07Gu9avO3vtZmP9I+4GuhxMgSQqytUm1/YKX+obtrtWzsCxKZHKQKBYQCAeC9HrA6eXj1rJ37/fvDO7KNINlGjLpHPpff/K21uXXxXtSVlINSP8oVe38PuCxDYPMEYfvLPS2HPnFuo8SYh6TY84XSw5tv0rDJ3oRSQ65Sk78y4blzeEiQINlGjmwhBvtIfUln4yodq5CHpr0TJMc9v7+0w2zhd8/3CybOBlbctVjffN8NLCuZ4dnqFGJ4fGPRTrJpoMSYByrkwTUFDcLJikMz3tmt1Sr2/uX6nZQYGY47anRbS7Rhe0EyS2d7W7UKicZSYmQwbqlUGyPb/sDsmFTo5i4qkDdQYmQwyvTyqGsaCs3efrcs02+ixJgnCM4iMcr1UiMlxjzBbKkSRHWunJ3P3klWEYP3z96+ri9igBIjgzHs9nNRYgRmN563tkplpMTIWGIEWmONTy8/e+RYU6WkNkam4my/+0js89kkBjU+MxivtFlNdm9gDDFm022lxMhcmN7tdnKx6sTlFdM7T4kBcKjD3hL73OWlUoMSQyCGbU/7oAdipYbNRaVG1hODwGy66DCNN0JnSo6mo0OtlBgZjqffG9jVY+fH/M/jEwHnEEMgOA1vp8+Lfygx5oMR+ut3BvaP/6fPL4IhmwQc7tQI8rdzggQyz9eLlW1OveFXmypPrq5QJ6ylkEpCwMgA5NKQUNgTW8PBExLxxPN95YyD+/7rV+rns8TIumhPhV6+/dkvG5q0jCTlz2I8pPnEUOuzHw5tns/SIiuJgbjNoGluuqeiMRVCvHbeCgfabaaPe9312XCNsjU+zG5ZmrPv22sKjIkkBxqqp3vd0GXzQZeVhwV5DHQMergDbdYcSoz5j4ZvrC6oc/iCOytZOQw4/UC2wUusUIVcDEiaK1YfVLJSqMmTgdcfhFyVWHB72wd8ZuKuvkw291NizFMsL9OECjVyYdsfDEEgFISbSxioLZbCnYs14QslkYCMUQjbwWAA/B6P0Gey97TNvPNg/+b5ZohSYqBByjLNiwtUjXwgAPcs0sA9S3QglRHvhAnHzce3LkbgHOwHB3m8c8kNPzjQt20+9bfSuDBBN+d9+cYCKTz1hVKBFGG3dfR1j3UYvA7bxF+VJPwmrMv4nzsKm8hmHZUY8wQbrtM2fXN1/vYlBcyY/yuUIZBIJmbasBteLJYI3fDY04rA3MuwQwy/Oj5kevq9gXnhtUiymRT1CzTNj3++9FtlOtlEAsiwc23iZ4J+PwR4PtqLECEFFhqX6mSG1h7XqUGn/xxVJRksKZ64s7RRy8S/BMEphMcxEjpok0Srz7Hj7Z4l+iZqY2QujKg+EpFC8E6SlACilMDcCkqK8XUdt1drDbh/SowMxKPGoubxNkU8icG5goLHgW5p1BD1haUEFvvEA0qNh9YVPpTp10iahbyoI7aFYbI3vXrOBnvb7LCyUgVPv2uFdQYGWDkDNXkKcvOT/56uL1RiXyt+h5lKjAzB5uv1DfGMzVhcsfHw4hkHsAoZsR9CUKiRwH+szoEv1qlAJufhRI8NDnzCQWxVWCxWlKnglipNRjc9Zx0xqlhmWbLXfcQD7RjiIVcVFqZmCw9312pGpUERAxtr1fDAKi0YCgDe6ByGo512iK1ER6wsU22lqiSDwAdEbJ89BArZWBvBw4cEUmDjczAoBjcfBKVMDF7ytyJXQ14LgjwmrqHKzYMby9WwsJwDr51IkHMO6LWF4LYqrZBjuaFIicEuDJdylBgZgB67r9XjB6PHn7hMfEEuA/lKMQy6g6BRiAWyXCUeSKlmlBxuKycMcmPLKoW4xpfyh4VBbi98OAw6GSOoE7KfhosWb0smXqesC3C5+FDJvUvYSfX/ilI1lBEPw+MLAvZCFxG7xOZDKSMCpTQk+Kw+pwNchAxikUiQIGqUIiVKkATdsO9jFBRillVLq4n0MZBHJMmGRmkdjDZEp6VEycoBsDvry4bXVmqm/IHj3Q6oKJRDTX44uyolllmeMghq2Vipo9TnAKPVCplXTK7931EL9DrC71mcLybqRSEMeBvplBcKiiOu8JDLz8lU6tZui5c7es5y5PAFpwnmMGOblbmSuxaxzd9dW9SYymc+6nWBxR+ADbX6USIQyZGjIPaKNLFa+usZO7xwyg5/vL900u/QFpUIWdwgsWcuXB6C459YzB29DtNP/345lbqPhi11uetvKFZGE3p9dp779bH+PWTTRImRHIaf3lnReVOxKqUPoQH65iUbrFmghWLtqMuLdoeeCYE2wQxRlAxtvTxsulEzJmub0PBTKEDGKEE2Moj2cmcXmNo57tWzjpY3O5zWxQWq9UQ1cecHXLsMuUzdxlr9ph4bz7JKqeFLy3IMmpGqNDweJC2xoeH9bhf86x+7b56qFMra7OptBm3To+tLt6f6Ob1KDKeI9Oiy83BLtQY0MaWBqGL0TFC4IWLRRHK88rEHttykg8pcUVyCRFSL1ROAyMD7CCL/67by8NJHbsFj6hh0C241Q744XyOB79UXRyVZgSooHE8snrvA7H/4T6c3U2JMYmsQddJJ1EpKYxllEhEhR/iy/fWcFRi5GNYRCTJBLchD0V9sBH84YYV3unxQrWdgdaUC7LwvevPwppezUijXhyVR/sLF0bHVfq+HqJdwnKS9s5eoGQuc6fOAywfwttkHFTky4jmFYFWlGowLVVCkjp8BfNeZC1ua3pnSPZdmMTG4l9u4HesNuma1fOpxPj5AvBE/9p2I4AtL9EJg64OLdrAQ7+Um4qJGVIydeDD4wBuPRioS5MQVL1QRV9jh9UK+loHbixIbwIMXzsf9fwERJAVVyujQFhdvAZE4LF04t19QafGA89HBOfWLk9UVXJc4b0vLyQFTqp9zekcvPgazjERi3EdIEiQkeYNIkbcJUXpH2iH95Mdr9Yrgd+/ZIE8th0GnH768TBf1TKYLD9n9xYEQhAISIWyP8CaJzfhVOfD8291TnoFOaz6JIfqTz1ecvLlElZJKUTEiUMkTXz7Mo1y28YAK4Gy/B7osPOSqwwJ6XaUSNtaqQKtI7UDtHoBhVwh6uJCwjfjzx0OgJmrI4vbBg+sKYU35xN96K8fAM+9bdu9998oOSowUUKqTb3/y7qqmVFSKiFy5HGKIiqfwkYY/XOCWFKpxFaWwWCefaajNJQYk2YdaBBpCEK1i4q1ASYAEiBCCeMsw6PJjjSoMe/ym8wPuVk8g0HjfUi271qCES8O8YPSivYIezbEOK1y28rue/2CwBVLM9FJijODeJezh//xMkTGVz6CdoVNOfgmffm9w13OnLOZirdxgdfu5ASdvWlqkMi4rUW/KUUiNqiSE7HfwrXwwxBFb5sj7VxzmqzZf6ziXUxhffXetdj35a8B/MFo9vN3lNf/uzc5dMM3UPyXGDFUKEgMJkgx/ODm0f8+x/s2ZdDFo+8AozE++07fL6UttWIbdE5p0bFOJVpZxKxVQYsSAiOndqXopSAokxyQuroESI8Pxyjlu28keV0oZTx9xE92+xOQo1MgoMbJVpWBsw+efP6MAKTFmSaVE7A1/kBJjvquUza+3cympFLQ3rK7gvCAHJUZicL843rf5osUL0yGHlx9VK1esvowbkSCh9z+5vdFt84luqdQa5ZLUQj6YaEObA4XH3jNcsUwqMgw4/Djw3pMJJ04DXFPA5xbq9n3/1pKU+0TQgP3LWQtoVBJgpCI40+vmDn9iy4hpf1RiTAGdw96D3kBow/JSdfFUP4OlgH9tH4aSHDlEciTEbVVIJaI13ZzvhXSXHJQYU4PnbL/7YBXLNJKHYjJCvN7BwbAvAIVxOt5KdPJiiyugsLj8B6kqmT+oe3R96eHbDNoJIW5Tpx3ODrghRyMBrSL57w0Hvu37aLga0ri3lRIjdRi23Ji7b1WZug5HPg64/HDB4gM1IwFM21fkJi+Kw0IdrMlcnC/j7L6g6ceHBlKq3qbESGOU6ZnHlhar467vXlMoSyglqlgJfHmZNlrXicAC4Cf/adn9Wpt9ByVGhmNxgWpfda4irpdSoieSI2Ygi90TALEoCF8hhMByPmxKwiJfn8spPBBYGf7LY5bWp45bbk6Xc5TS2zy74NxBgRhYfznk9MFXCSEihbtYkKsrKRO21RjrIMTgrnSBjpiz31mXW9cx6G0+9IlzG/VKMhQKmbi2SCM3xntNKL8jdsT1hRJ45LN5UM6Oqo1gMAhiqQykchmIRGIQSyTCmEgc+IZxjhUVyrq3Ol2XhlyBOY9zUFUyTe9k/QL2JDb9jCFFELu+gvDQ7ey0q8CJrcE9uLcHPZY5bXamuZLpobXf4RvjamJ/yULikTyxsWRGrQF312rZtVWq7XN9gpQY00Rbv2sbDldBWIjLunGRBr6+Kh8CwZkL4QdW6nG4G0uJkZkwtfU7W2weP2xflwcbFoVHTQdmIeWOUgMrvykxMhT9Dn7P1uU5sCh/bJR8NpYJX79As4m6q5kLA45UGg8kBhMzVAVnhb502gE2XwhYhQg2LA43HycCThxemKNkKTEyFPfW6uOuNoBDYrGFERfeu2zlYc9bVlhUyED+yHzQ18+7gXMHgCdezNoq5ZhIKJKCc869IKeqZAZ4pc1qSvSazRVeJvzPp+ygZcb+/oKEEBjtxFkZlzk/vPhReMkLpyf+GGoqMTIPHCbSSrQT8yM4eN5il4BlZAZXny0ArAojozx891Z91KXFqOj1HgZ+c5yDNeW66L4uWsa6w1RiZFg8o/WqK+ENRA8F11oTpAThx2XOB/+2LGdCnAMHtn1zLQs9Thd8eNUlxEQOddiOUGJkMI50OpIOTfvcQi14/X5hoOznazSCB5PIa9mwRAOVeQBNx/rgz/cv2E+JkcEYdvutJ664Er6Og1V++NliKCWGZyTWkcydRWny+F0F8PDBrjld94Qm0WaIb68paLZ5g+z4WEYshOFpain4AiGBKBgdVTEhYcbGBKMPJ/ZBAOprNHXtA17DRQv/MpUYmYeGWw0aw/pqDbx6zpr0jUic8wPh+l/0OuJJDUzL5xlqhHmfaHfs3lTSeMd16mZKjAzDQ+sKt6IEwMfSErmwCkEyOGL6YdE1HQ+sz8AZ5aqcPGFJz7kkB1Ul0wcuA95iyAl7GAsKJCCWBOGDbg9U5TAJ7Y32QS8uqjcSq8ChK2ODFj63ExiNFhi1RhhiDx77nKgVKjGmCVxZwDgy31MiBiHKiYbjmgUy+MuZoQnrlyAwRtEzMs0PgctnjQ9m4ZKdlq5OYbYnjo+OlRxrq1SPUYmR5nhged7OZSWqJbitlIdAPpIb0SkksKpSAe9ddkCPXwEd/S4YdPACIU71uMwdQ17TVTtfXFuoUIRjHSJQjB81TdjisVsnSI4bihnjqR7vqX7Hp798JyXGNLH5BvYpIjWEm6tShCaMgL6+MgfWrLgObixXQaXSBW9csLX+6FBf7Ue97hcGXf7zays1X414KGGJA5OSQxdyAasUb3itzYGdbJ9qhRdVJdND3Q1Fo9lPeZzVB4RJvBizGFn6+7jZ/UzktbZ+z/5fvzMQDWDZ3eLo2q3J1ApWmGOtxgMr2U/dGKXEmJ59URfJaeCvPV48QhYhht0m9I4cvuAcE8l8/bx12wsfWcwR9zWSdEtGDqwwR8nx38Z846ICeSMlRprhjhrd+mhAShI/FSojJgS6noiD5x0mmNiOyP3saN/mSNQUJYY1Qbo9Qg5cTUloQSDG6L+vysHIKEuJkUYo1kjrRokR/z04+N1jHRbS66+12Z9JsKvWJ470bot4Kj6/iEiOxOSw9/UQsg0Lz+9frmeJWtlJiZFGKNPL65LZF4Ld0N8jBKz2nraZ2wd8LYn2hYvp/fRIb0vEvcUin0TkGI+tK1msJjdQYqSJ4VkaM95ALI5PDJdlSJAWf/yQ2zXZDt8yO7Y1nxiKNhkhObgpFOxgLcd9S3VNlBhpZnhGjM9EeO4k15pMWsTi2Q+H6n/xdn+UHKhWplLN9V/GPKwmN1JizL3haZjM8ERgrefjbwym0sHOjSdHpAosnisbAdaL7rg9byclxhxDKRNFlwAXJ+kS+LlpCN1TU4q7F8jx8IErpojNgVVgKDmS1XBsWaYzzrbUoMRIEbED4xOtVfLPThf30mnbdOddcIc6bPU//MfVqEEqjIgkrmy8jOynJTUoMaZhfCazL9DgfORvfdNeJyTWIP3x4d7duFJSBE5PYqN0RGrUUWLMEaRiUdKgEhqcZgu/eza+i0iOHT/4+9VtseRAo3TQJpmgWrANwZDLzFrPK02ipQhcp722RFUnZSQgl4bXOI0AO86+u793I9nsna3vG3YHWvd+zB3BNH8kaYdAYngwM0u+3+4NwpNvc7CiQlM3WxMBqcRIEYOuoHHPWwPwwkkLOGJqLlCFNB0dQhXyaQw9MRGD9Gb0WKJ2B3lYfSJ48yIP39nXDzmqcJvCokLFrIxQoINTUkPj8jJNc6EmfBMsbh6WlzNQkyeDA+dsLddiTBJxl5u2LM3ZjuOcjnW74ERXeLVmBOZQ8JgOtVtFlBjXACvKVI+Rm/EQpto1cjFg4qttwAuXOB6WFDPCvK3fHu+vh2s3lhFjKXXrDPp9uIJ4da4cCjVS6HP4wHTRwV0c8s54Ig8lxiRYU6He95MNZQ1aZqI5hgT5W4cN113HGeE519o7+t5tRSe/tixXeJKrDUYDbjiu6YnDg7tmYgRTYiSH8ZWtNYfj9aZGgB7D/c93ogppuYbHxX7/9qKTX7kpFyWH0KOiUQYnuM33PdO1baoheWp8pgBy8ZuTkUIw9vIV2EZwTYecVOjljRFSIJTMxDE+aG/cXas1UK9klkFcw8a7FuundGHP9HnM1/LYNi7WR2MVGGRLlMhTycXLKDFmGV+8kd0Zz66IZ2cc6rDtmavjlEkTJ/LK9VKWEmOOpMXZfjcmy8xzdayST+kOUmLMUFrsOda/ay6PVSJOLDFOXPa0UmLMgbQ42G5Fi791bomR+DUtI7ZSYsyBtHjpDLdrvl4HSoxpSoun3xuYcWp9uogtFqLESCNpQSQFRyTG7rk6zthioWR4rc1upsS4RtICs5vPn7JgdRaXDsctShK7bh/wUWLMFHfU6LZORVr86dSwCXtB0uW4kxUkU1UycxjvrdUbp2JwEttiRyacEBYNzcRjosQg+Mbqgq2T5URiDM5MWqedo8SYPthF+UzjZG/CzvS5NDhTRY+dn5HHlPXEiB2ZlNCIG/TAz472bUsXg5Pc9EmPQy4RUWLMBMS2mDRl/vsPhlBSmNLlmN186FRkO1GX2mWrn6PEmAEq9MlXEkIVcqjDlrYRzkS9rS5f8BQlxgy8kXgL0cR6ITjcJF1USDxgn0k8zCS4RYkB4dmb8YCBrP99s2dHOnohRIKZR1VJPDXCY3CrlRJjBu5cbJdXLIik2N9t9aWlF3LR4o0SAxuPxqsT7EqbKaGznRjmH/yjx/xyuw16iYTwjEgKbOzB4WnpfNyxhHZ5x97GS8O+GUu5rF7hqIJlmhblqwzvX3LDwbbwHPBzAy5cMnNbuhO6i/Nxi/IVbJgYOER2tDbjqs1PiTFNGIib2liuZxr0irCN0c2JoXPYB4UamQHXUk13XLT4sKSwMeKZ4IgEnSoYMTxnvDpS1vWVRFr8EnkjxLDjXjw9vId4JI+lu0f13FerD1+XrwCkMZoZhdog/OUUxz38eh/tREsF2Gr487vKJ625QDsDB5fgjIp0Ph8sFai/Ttcsl4pBKRPD+X4PvN/laOl38DM+7mwyPtmvLcudUiEOvudH/1LaiERK5xPqd/rhCheAzkEezvZ4IRAQAVGPqF5mPCMjm+ZjKBy+YN+A019Mfl3Feark5hUT/hXWHeqwP5GuJ1SgkTcUaeTGyHNckM8XCEL9dcrifJW02jzM4zwNM1UlKRift1RpGlaWqbauqVTXJVrPDFVK/W/br2UXe8rnsbpC10k4DKvKlWCsUcKKCnn0RexffavTyT37gXXP8Uup2Uy0qXmEJKvKVesxbzI+07ryl23pTAy0mw4Tu8mI6k+tCJHHxD5WJMgvj1lanzpuqZ+qUUqJMc4OwTQ8ZlxLtDLjZyrUbDpLDPSwHq0v3h6xm7DML0cTTFgH+uDent3Eld1BiTELLiGEQ8vpmEQz/GZzVed4txuDXNj9jqsujSfIwfMO+PqLV3Omcj60gis5TGlKCkD1Fy8WgwNjHW6xMNkPh9XHTve7c7EG/zRMZf9Seu8zEyqZGAfFmoZcfoPHH2LLdLKkYXCcMCgShWDDYi0cOG+fdP//L8AAGgVRuf6gJoMAAAAASUVORK5CYII=';
export default image;