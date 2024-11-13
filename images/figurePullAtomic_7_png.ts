/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACXCAYAAADQ8yOvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAG6VJREFUeNrsXXtwU+eVP3rLelny2+ZhGYyBmICAPJ0QRGi2m1cjmmm7bTeD2W6nzXZ3gH/a6XSmhm53uttuCsxuX0m3NttO2+mU4GSTNElTLJJAytOC8Ai2QfL7Idu6kvWW7tV+58oSkm3JMnFky/rOzB29rqQr3d/9nd853/nOB0CNGjVqmZqA/gXTLRKJGM32sMHLRrSJzz9RITELBAIzBUZ+gUH/u95g02ggYvpogtWm2m+NSgTlckHLF1dIjxCQWCgwli4gtMf6g02XGHbfWDAy4z4yoQA2aEQgFwE4QxHodHNAnoKtOhECZD8BCEOBscRA8UKHv+2WhzOk289UKSVMIYw/DnAAfxoOEYCwoFcKbTvLJLu26sRLij2E+QyKH10abesYGjPMti8yRTKDIFgkvFuxeTj9KwPBtguOsIECY6mAYthh4Pxe8gSXdv9e38yv7ygR87dEl2j/PBxqw8+lwMhhO9bja+oYccav8Eg4lHb/U2NhuOJiZ2CS2564x8tpj3YHmykwcjj6uDDg2JfIEhEuMuv7UFO0DoZ44YkaYyQQgRP2ZEB96GRNHROscSn8T+J8A8Zvu31NdpcnGSwsnmD5rO9FsYlbKvOxETg9Ft5L7popY+SYjTg9pmlPcty8ff5NN2tCVqLAyC03Yrzu8E0TiLNpjLkY5kIuMrnvTvIKGJjmngkEXCgwr98z5OcoY+SS4dhHhJ1ZI8wnawz6uO0UGEvE+HwGNQqMqcZmkOiiwFiiphAJGIFIlEKZcsD6PPPyPZUFwpMUGDlkxlKxRSCWpGYNj2tetEaFXGijwMghwyKb9cXKtEPkIWYUIh8jSimWCmCLVmSmwMgxK1MXtKbdgbgUBEd4wnFH7FGtEGKVV84zRt6lxL9UXXDwyqCycWpafKYohY9UBEIQEvcjkMqS2UcoIhhi+VtetwjF/O1mnfgoFZ+56U5sGyp1LXjCMzLCIJgAQ/2RuCGjxG6RYVhyiy5kq07cQoGRu6yxv7a8aF7pvlSjZL5SI9tDw9XcZg3msZWaXeXFRfNSq6nWFsHutbpdS0FbxP8jyGPDcrw3bUyb1c5o7yi5RdxReZGWQVDUqXM/EqHASJQQkYi25aan+dKQ0+T2ZJ7gEsoVcG+V1vyPtco9S4kpKDCmGFZenRr27e1z+Uy9jHf6iOtkdFKiLoAarcK8pUR+dKkITQqMDBnknfMftl2z9hlEZctBqSvmnzeUq0EtCIPQ6zq4qkZ/YKn/D2IKhenC9JVXX2O63v8L/7jhoYf420LNPaBUKmDEkx+jsHR0NUPzEECUlZbmzwVCT/l0O3vufPPFi+2NYrEYZDIZcAk1oUKhkJHL5ZbS0pKT2x/Z1rpU569SYCTYmbPn9nV13dzb19+v9/v9s+5PAALLly2zGQwbD9bfdVcLBcYSM5ut23jq9AfNXTdv6mfbd93atSCVSvn7DocDevv6+Ptr6+osd99dv4cAxEKBsQTMfPLdA4QpmjJhiIYHHoBVNTVTtIcHzO+9x4NEqy2ETRs37jFufyTn2SOvxeer//d68zvv/KXJ5/NltL9SqZzxuccefRR0Oh0wjBPdUTOCjQIjR+3Nt94+dPr0qcZgMADhDOsuPCkyo+hajNu28feReZCBCDgaKTByzC5cuGg6c+bMvli0wWU4E+38xYsQDAZTsgmyRgwcly5fbr567ZqBAiNHDDObfz1zpjnx6o9kCAwExZ9PnOD1xEwWSgANuhWL5fLxXP2f8i7zaT55cl9PT492Clgyfj+C4vU334TVRIQuX748HqF8dOMGTB2EwyiHsEZjLoaygnxji5/89GfWqcDgXYFKnfS4qqoSpBIpME6Gv/rv1GpXr7Z9+Ut/V0MZYxHbtevXTb29vdoUoMFxkvhjr9cL2kod6IqKQCwSETZww+Dg4JxBgsky8tmGXMuQivIJGDt2PNrU39+/bsY/QizGdHf8sd8fgOHhYQgEgiAWSwC9zYb6etAWFgLiZ2LCndF3hsNh8hkB/29+/eu3KGMsUnO7J1JGCRzHgmjKLDWFUgHWW7fA5XRC7Zo14CEsYtz+CGENBjq7ulBDwMDA4Kzf6w8EjNiCgdy15UpRT15FJcFgSJ8aGNMjEww7S8tKYWRkBC5ZLDwI3nr7Hf41BMjjn/40PPjAA/yYSTpjHIwh1F/eFh5abw2Pfq6d9R5rpMBYPMLTMDQ0lPJ1llB+KldQUlrCJ7cuXrgAo6Oj8N6pD6DdcgnKCGiM27fBs7tMfISSlpqLSeQaCQLne83Ajv19c3j0y4u6y18+uRJtuvEQFJ8sO92dxEyn05JQlYErV67AipUrJ4XlANx/3z2wevUqKC4ugvfeP00AM11jlpeXERFTAQL5EwRpnRAJXSIAedkYGdmJ4NixGDsL0wquJHYIpQQGilN0GQiu3p4e8LjdvO440fYuEaV3kW09bHu4ga/fsFy6xL/nvk1+uPeuMyCNfB/Y0UrCz5XRHIGoGkBCyIJjDCzzrSby1H6ax1hA+/kvXozcImIynSmUShJ1pPawUokkLjgRBOvWr4+mw7VaePihB0EqlcAHp9+GLat+BDLB2dtXYAnRJoLJXElkAljmnyDCDYOw4GkQ6V6sWWyiNK/Ep0QimZWyA7MMvwdDIaitXR3dNxDgRengwAA4SKSCwtQx3g0N6/41CRTTL0c1CGTbCWM4gfP8BljHPzdR8bmAplarzLPtgzojEEgPDoaEr+vWrY0nxKxWK1wl2iNM3iv3PU80xOXpn+t4DiL+18lrF6Nb4HZvFc53rJF1/4+JaowFsupq/UkcWZ1tbCQcig7DS6WypGxooo2OjcGqVTV8ogvDWScBiyzSDp7xdhBqxCCTJ0c5EXYQ2InvpYiVCXP4Xj1E7rXe6W8bHBrGCAfDYGwMF4t2EH0tlRXlc3ZTeTdW8l///RNH32Q53qx/jlDID5KJROKUAIlGLDro6+2Dr33BBgWRt0As5kBb5J/7VVp2apdQtqU1zcnHE7+JbJiow5ONKrcF0ypkwz7mWgkRyUVFOv54fT4/OF0ufOthAo45Cdx866jDVFdXt2QMJI7jNYfX4wa/z8sPq2O+A91NJGGuK4641hD2UEmuT0Y3Qn6bqwV81qaent7GGQBhIJuVgLS5tKR4X0V5mVGjVuF+yDJWsh1PYIk4iAsK5LHR333k/c2UMdKzhv4/X/hxu91un9fk0qpVq+Az93w7/lhOXIlKE5zTZ7CKfwNW9jUIBAOMx+1pcbomnHK5jDBA0V4CRi2eaNVkeSGC0z46RiKkASgvL08Ks/E+7ovN8zGNn2C7CHNk5K7yLo+BYWGb2XzkrbfebuK4T659o98vBrkizLuVTE0q9oJQqcAZb9oinW7fCvJciOgdjHhwwhO6QIlEyhcdI0BwBBhHe/G50tKSJAHtds9YhtiUqY7JywTXDqPxwB+Pvbzp3LlzprkU6aQHgo84Zg0Rkq74c26XFAp1AQLGzL7DNrgSbBff5e8nznrTESAoo4Dh8yg3OrrAauuGGn00A4uDeonASGMZlxrmbebz2c/u2kP+UH1nZ6dhPsCBSa+IZCsIAm23oxuiM5wOGWgKAyAURWZwawKiW6J6RERe77AqgHHZ+ddGRuyzfqfL5SbvE/KsgsyBTELD1XkQojhOcezl483zxRw3+/VQO+XCxZM+PlYAUhkbdyscK5gmUDnJFmgzX4TYVAacHhmbroAZVtnkCC7el8uijeKIEI2/H2tH1GpVypQ+BcYcwYGCjGiOA2fPnmsaGxu7488qKSlhVGWfOiKSnNjLBrqnCdtgQMRvKd2I/VMk/HTqbwMqzOdG0hkKzGXLlsV1RXd3D6xYsRwzvEl6A7UIFh6R/TPOZ9ApignRSusrrzZ1dHQ0zgUgeGJWrlzZYnrmMwdR2HpHftDoGnipmWMzLwGUFj5tLqlt2YH33/jTm8ahwSE9EY968nmbiouL+IxoZ9dNft81tat59sAyAIxGkEHYKSsq4GAfuphgMMS7mZgRjXLwgfvvO0CBcYcA+eCDv5qsVuszbo/HiDmK8fHx+OskdOQTWnj7UEMDpseZ9evW1iQOnU8M/Eejz/G75rC/NyNQFK9u3pVq6P29909bg8GgPtX7YyO+s36PVGqrrV29mYSrDAXGPAGF3Jh++rNfHGLDLChUSnLlqfjo4OmnHudFIgl796xcuSIpceYbbzX4mFcPBd0XjFxoeqZVrNxhk2l2Himsev5wuu+//OFVIwFmG8umXosNoxVPmoYuRHfYKisrdq2tW5NxQTIFRob281+85Lh69ZoWBeEmQzTqwyKdGn01nD13wULub04FLI/9JVMoMKb1eQNEIBYAqP7FrNYozJl+97XrN0yEuZoJM2hnOOkoOg+qVCobAdDeQCBoiIFIKpUwRG8cqa6uPpwpU1DxOUcrLS3FxFAj+nbcECAdHV08MBQKBYa8+plqKiafm8IK35rTd9+1fm3r4NCwmZz4xokJ93YCBm1UWIZPKhTKlo1318e+l2ctsq8R9eydDJ5RxpijjY2Pm37wgx8exxqMyqoqqJlsh/D0k8Sd2O0o8vYTqj68VH4v7cGVoRUXFbXW19/FX4H2kZH48x2dnXxm0j469sxS+r0UGHOwujVrjsZyDCOT4MCCYK1Wi9VcRgqMPLWGhgcO19XVQSJrYDTAu5JgCCYnFVFg5JthrkGvj9ZzYFYS9Qaa1doNEqkErly9ToGRr/bUk48fxJnwaFgLwbOG1wsydSGMyIufeX0weACZAyc45fRFQE/13O211/906Ny58/tKGz4NkZXrwRYQgY9NHoQrEAlglVJoK5cLWp9dJj2Sa43oKTDmaFg3+sZQ6NBfx8KNuI77TLZVKwa5CMDPAlxxsaASAzxQLD74ZKX0AAXGEgXFCx3+tlseLqWbQFA8Wno7bxjgAE7YQzxANhaKLF9bJVuUUxKpxvgYoPhR+3DbjVvWOWkHGfmHHy+XwIoCIVx2sgYE1mKezEyBMUd76ero8c7BUQNwHESCqUczkRkCM5R5btBEazGQbY52B5spMJaAnRjw7jvXa4+Houm6/AW4CPy+Lwi9vuR9XOHbeuRDJ2t6zx4yLebfTDVGBvbjsz2O63ZXnP5Fah0IVbN7gzLiR9CFjBAKmQqUeo3I9o1aeQ1ljBy1C3Zv4/Uxd3L7R47N6L0IiAtMeBooJl2KfjHnOigwZrFrIxPbYYrriISCH/tzMe9xrD+4mwIjR80RCBunRSjh4Lx8NhOkjJGzNmO9JUYm88AaxNPoKTCWWl4jkFxjqZexfBp8TqCjwFh6xnknkh6Xhidgx8hZKBOzGX+GVMi3MqDAyEXDsvsZGYMNA+e+ndl2Ol3gGBmCjX1nMgaHjAIjd00pFqYsuWcnHElZUJx/EphwZgwOrXTx9henwJjFDJWFr6R7PTw2CJzHBZ1ulm/SxovKDMFxr058kgIjR21LSUFrdZE67Wgo6xqDCoUYYlMLeDFaWQr3DF9MKUgx81mtFLVSYOSo4RD5pkrdERCm/6t6PGF+2mKMNRyME+6q1UOD+wbPKrGNdQzz+gTrMxbz76bAyMCe1msObF5WPKsekJcv46vHo1Xkdn7q4IYSFdynCPBaBDfO74XN6oh5q07cQoGxBOz5u8t2lRWq0roUeVm00TwueIPW3n4Z6upqYYsiBOUF0WH3Wp3C8tW1hbsW+++lwMjcmLr+C1CdZgUKt7osCgziTpA1sHcWtkTCXuMNci/UFqss33ywhlZwLSW70dFpOn/qfa3r7d/Cw0VCUEgl0/YZBRnfLwNBEWudcOXqNb6RycaVFfDFKtGRXAAFBcYcrL3dwk9BxOWxpD3X4DEYhC/UV8EKzW0K8YZYkFWv5e/jCgVoOCHpytXrBDBVMO5gDuVCWR8FRoaGJ3N4eJivuNIURhugcQEv7KzWwS5dEF58on7H02vKDuLWsPluXlTiZKTYNMaOjk6+s01lZbmWgGRfLvxm2gYhA+vt7TPdvBldzqJwEhixxmkKRYGFuAczuWuOgejMmlpTZ2eXFlmjrKyMX7EAWzDimiaDg8N7yT6HF7tLoYyRgZ07f2F77L5Go+FvY304B4eGmal5j5qamtYYa8S0Row1NBp1TrAGBUYG5nK5jDGWwDaLaNj6APVDoUYzLa2dOI0xlvCKsQY2Wplwu3dTYOS+vtAPDQ3pE90HGrY+wI68hRq1bep7cDpifX09zxo4+dk12ZYxxhpCgUCPjVgoMHLYxh0OQ2ypK01cXyjiDdFWrFhunul9999/75GSkpJJjdKbxBrLSYTS0dG1mwIjh81iuRSvy4wJz5i+cHs8KRfYLS8rM2/ebJjGGlabjV+W0+l0mRZz6EqBMYsRVtjEh29EW8gmWzXrJt0Iy7LmdO99+qkn9se0Row1+FUE+gcIewT5aIcCI0dtdHJdk0R9UVZWwqe6K8rL0tZTIJs8sm3bwRhrxPIamA2VSqQwNDyynQIjR00oFBkS9QU2fkWQ4LA60Rez1lNge6YNG6LtFhOzoTiOQlzRomUMmuCaPVRNYgzUByggFQUFrZkkqXCfnp7eXYQt2nEoHlkDk168RnG7tZOdh/WTuzNkfwtljByyGDAwGsGws66u9mim7125coWloeHBg6hTbFYrP8hWViKBTbXvQdj+t9ZQn6KN3wYq20MjTzrC499o5vzvGhfy99JJzTPnLrSc72VTxPf6M/3DMhOuRligrIBR53rot5dg9tNmfOThOU9I/t3v/3C8vd1iavy8G2or/sAvqxk/EaJKEGp+yN9GAu8C5/0VCAp2HRbrfrifnpFFYOzET/eFhhscwd6CyExbaHBdZLz/R213CDh9z4fPRZw31NM/d+ihCOe/HN9Y9x/555E9qCtZYGO69zc7e759KBJsT5lfiIS7QcV91xge/Vz7XPMQrp7nD4mDb0AwOF3aTV29WSCuA4FkC3CeXzWyzu8foMBYIJsY+I8D3tH/bcTVDzMxzveagR3/SsZXc2DifaPP8TYfhURS9F1hXd8EbuJ7PEA47y95sPDf5X9jb7aTYRQYkxTvHft901zfR06YKdM12X3jx3bHVj1Kt1gv5389ChDPS7ePjzAY5/5ZIwVGls3R/Z29bLBn7m8k4jHiP7E3k11D/r6kKAMXzJsTeIPnt1NgZFtwBjpNd3rSItxoRmGlQBDQJwElNMfVDiMB6kqyHrNPOWlzWZcdQ8s7aS6fqZZZKKPAmMHSLYM5X4YL8c6ZNSgwFtYCBBgZuxMhP4Yye/2msMg8LXxlpJmzk2iZhQIj21eHUGNJjlIE4HLK+NtZ3ZBka0bjG3JNwyvToyEBv8S3xy1Nzx4EfMKCp16hwMiySTWPTBv3wCuZGZdDgGiBdOwhEOszmrGuLP1qi1S5iZkJHD6vmAfI6IiC35yMPL4hQIWynWah/BFzVnUXhUV0bGTsxk5r0HMppfIXiSIgJJtAEOHXaMfHctUyEFdcr8l0yYmAo9nE9H7vOBtyZXxsIlk1U7LqOztEimepK8l+VCJg1OXP7RGKClOHtIQ1UDCiMPV6JDDhIvpAum//XNYhken2tCpKvr5HJF2ZMSg0Vd/NOigoY0yx0ydftC5X/VIvhpvpryYCIFnxVw/qVnz7wJ18D67i7BlvPRScOGkEbjp7CCXLQajYaStd/cKOhVoAhwJj0i62Wxqbm482V1Wo4PNP+kAp+DNMXXobASEs2GYuKN5zUF1i/Ng+3+cNGALMb/be6jrTiI8LlOXg8KyBB7c9B+fOX2Tuu3erbqH+D1rBNWkWyyU+te0PSuHsR5tg+bLPwn1bKmGg55StRNN/lAMNo6n8ujkagRydl+8sUMgsRN8cbf73KzwwGh7i645hPcNAQUEBVncZFqqii2oMYsMjI8aPPrrB13YWFRdHowilAkJcGTh8d7eqq751oLDq+cPZOklYE4oFx1euXl+wmlAKDGLvv396t8/n4+9jHy00nDvi8eIa7orubB1HbO4JFhrj97vd7k0UGAsYqnZ3d5tioIjNTcWiX8bhhLo1tVmncpyzEj0enYECY4EMO+VYrTZtohtBUGAXHFxkd7LFwSdqsRlusVaQ6ErQyDHoKTAWyK5evRavc0h0I5MnyJyFQ7BotVFghFl20pUwcYAs1LLgeQ8Mu91uiorN2y0Oli+r5OlcKpV84uMTmFwjEUgUCG53kgBFAUwZY2H0haGnp1cbdR9l8WgEWxz09Q+ivsgGY4BCobDhLcvebjE9KXwXbL34vAbG2bPnjRMT0eUlNFNmsgeDQVu2wlO5XG5L1Bi8AHU4F/S/yWtg3LJaeX2Bs9hjM82wdwVOWJZKpUezdRyFhdGuPDhDLWbYS4MCY4HM5/PpE6MCnLCMbRdxjumG+vUt2TqODfXRSc+JuYxE9qDAyLK5J9xJ2c5lk2xBogNzNgevsCsPhsiJkYnH6yUAHaXAWADhqXe6oldnrBMfNkTp6OiCNbWrsroyAIKwoqLClpzLoIyxUKaPrhBwO0xFtlCpVWZsk5TtgykqitaExkJWDFexLdNCWd6OrgaDIeM/7GmEldXRohm/3w8M4yTupPLoQhzPvfdsfcVsPtmIvUETcxmUMbLnQrTjDqZ93OFoqqiswLAU2ytCFblft2Y1RLhI84Tb3Zjt40KdUVOjZxbaheQlMBAUFy5a2rq6biYNTgmE0XoldClqtQq8Hm/WwYEZ0MrKSr6wuLhIBw0P3g9/89hOqKqqbBobd0QImx0PBILGrB1PfuUtbAesVlsTZhSrq6uTXlMqFHw+IxwOgWvCDRKJmCkuKqrJZs9vbArb19d/PJaFRZOTY8KxFAJqcLs9eNtSWKjZQxljPv/4sfHdqXw3hofEvfCgQAuFwlqv15dV1iCgaMKTn2ixNDkBKKhUSvD6fI0u18QhCox5DE9dLpc+9jiUQWaR7JO1GeYfXrnaODo6ZkARnHQMuCiOg+Eb1vv9UWHq8/n24TgPBcY8haeJD2JjJGnBBNlrVkL0w96pLHE7ggryVV1OV7SinCNuhbDGXgqM+THbFLcy7QRMF2DZ0xeEEeIM4PXOHqZyEU5PgTE/qt+G3fYSXUl3d09alyKRSLK2knKiC8mEzajGmEcrLi46OvVkdHZ2wa1bVuzrDXb7aHwjPpxRKApasnVsKpUqfh8TbVO1BgXGJ2g1+urDhYWFlpmuVrxK7XZ7fItEuP3ZDFUlYrE58TGyWTqXIhKKPtFakbybiYZJrssfXmnDCGCm1zHJVVSk23P3hvqWbB5Xf/+A6aMbHcenAUAkArlcFn8sk8n5wb7q6hU1n+QIcN5OUcTw0OPx7pZKJEaeNQIBm1KpMKvV6oOravS2hTim6x/daB4YGJw1d7J8+bL9a+vWHKaMkUeG4BgZsTcmVnMlsllhoWa/YdPGw5/0cVBgLEK7ZbVhLepu4u70JDLSkpOEleSWouKiI9lis/8XYADvg1e6wVpUDAAAAABJRU5ErkJggg==';
export default image;