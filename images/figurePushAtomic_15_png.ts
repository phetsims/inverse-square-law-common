/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACXCAYAAADQ8yOvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAGwJJREFUeNrsXQlQm+eZfnVfIIlLgLkEtomxsRE2xo7t2MKJm6uNca9tp9MGpp3Zbbc7tmdn29mmHUwn3W7b6YK72bbptoUkbXpME+PYSZq2a5SkvuJLDtgxh424D3FIoAMdv7Tf+wuBMBIIW4AlvsfzW0L6df3/8z/v8b3f9wJQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQRCU49BCsDLxer5LcaO562MThcPSUGKuQDDqju6Jlgnl21OnV9Ng9s56X8DiQI+Wa5AKOblcS/3h+PE9HiRHjeLPfeazJzBzusnmUwZ4XcTmgEvlOx7jbC07CmYJ4rq44gX90WwJfT4kRgyrx4h1H44dmRhNqHyTFP+aKyO3MY1dMDJwdcUMcH2BnEr/y6XRh/XJ+by49dUtLih9dH27UD05o5ttPIeDMIgVim5IHn8sUwojTC2eG3HV/6nHUUGLEEClaB8c0bot53n2HHB4wu7xzHkfTUijngZ3xwvkR5ggxRxWUGFGOPxksVa1DZp9SeD0L7t/Q7wKHJ7iaIJAcF0fdNYRwakqM6FUL9dWB8SOBhPC6HAuqxosdDta38KtHN4lamseZ6X2GHV7lrzocdcvxG/j0NEYev71jrTKOWxf9OoeH+BNGF9lC79Np82iReBwOx0AVI8p8iw6zfY4v4HG7IvL+6Iy+1us8TE1J9EHTbbLNfZRhIvYBxKRoKTGiDG8NuLSeIP6EN0KK4XNEQUOJESNgyRJGdBIORp0eWOrohBJjOcnhmIyYn0FAiRErYOyWiLxPkpDNbdCoJOrACX5Y0c+IhGokCrlAw9UoQ6Gcp+fyBSGfd0+M3bcjKuHBko+2UmJEGNlSri5LKQ29A3FAXabh+yJHsoijo8SINivC4ZhyFZL6eXdCcowNseqxWNOCxTyfyhC+tNS/g6bElwClKslLl/tlFRbr/Glxz6SN3dgrVCAi/3GAwxeGcFt4wBVL2eKd5Sj/o4qxBMCSvJJ0RX0oJzRUngPVg7GOB91QXRI4LsCKruX4DZQYS4Cr1/SavtdfLFfLInd4UVEey5AtW5kfJUaE0dXVrTlzRtfY3d2j9J49CWsS5Pfvt5AoZ19eSn2ZSlC7XL+D+hiLAI6c9vcPaFvb2uaMVaSkJBs2FhQYXvzFL2s6OzvZgl+5RARZw02QmJwPzSbXPaXE4+Li4EBecvXT6cJjy+pE09O9MG7cvFnR1HTjsNls1gwMDobcTywWQ0pyMjgcDrBabZCRmck+vr9sL3R5ZXCi0wJDpomwCIKO5uZUueHxDFnlSkwjoMSYB1euXC2/1dJa0377tnq+/YRCISQofbMCBoeG2Ns1a9IhPS0dkglRdpSWQPONj6BwU0HZa73Og31ma/mA1aUetkzOMRlZ8SLIVEgaNicITxJ/on6lfjs1JSFMxum33q7525nGisnJ+fMMCQkJcGD/fpYcCKfTCXc6OuDD5mbo6+uHoqItMDAwCC6Xq5aEmXjl43Z0anRUjcP0+Lo0MdewVckzkLt6zIWseD6G0mAuKX5VV9/Y09OrISdowf23bN4MWwoL5zw+NjYGfz1zhiVKYmIifOLpp8rU6hxdtBwHGpXcTYpf1zW2tbZqHPc52IVKsu+RR9j7o6Oj8Mbp0yeIr6KhxIhCnHzjVE0biTgIQYBxu8N6za2WFlYVgiFVpWIJ4lMQk/LsufONU5OZKTGiydHU6/UVSIoABVnwdUgKv8kI6pgKZkZaSairbDj5Rh0lRhShqampxmabXcTr8cwNK9NSUyEnO3uOP9Fw6hSrHtaA8RH82x+l+NHa1l5uMHRql+p39A8MasimndrU1Pm8zzzFyy+/Une3QoglUuDxeHOIIRJLIC0tFXp7e6Gnp2fRn7exoED3mU9/sizChCgnNzi/VS2TSoHD5RAVc6GSsVFQelqqnirGInH16rXDwcyGJ0jJPya4jMYhsg2DUqGEbVu3glKpWNTn9fX3aSNZzEtIcYzcnEBSCPh8EIlEgORITFAC+RvV6RrZp4ISY3GRiLqvr08T4rmgrzEOGcHQ0QFOlwsk5AQUFWkgcyrLGQ5MJjN8cOlyeSS+f4ehs9zlclX5/3YRp3mUmLbhkVEYIRszQ+6axZiWVU+Mmx99pB0ZGQn6nMcTfJKQRCKBIeI79Pf1gWnMBEWbN0GZdh8UFGwIXzX6+vZF4vsPDAxUIdGYu9QtOSkRksimVCqB68vHYDRURYkRrgz394e8ipgQs8e4PC6kEl+jg6jG8PAwnGl8DxKIOTnw6H7Ytm1rWJ9rs9nvO6dBFEDJ4/E1RqORHZ8JhMvlC7eFQgHwZyIjLSVGmBgbMxXN93wockhlvrrOW7duwZjJBBc/uAIymQw+9tijsHcqsTUf3G53JHwMDTEj7B0ctAsEmpOJCQtgFZnbNV1fSk1JuCAnaN6EU6hE18TEBCQQ5468Htrb2sA4pRyI3bt2wsM7dy75dycOsNo/lhOMwFYSflssVvCEkY+hxFg0cUJXc3NJKCslzifmLlqmlAPJISDSvb1kKxQWblrS72azWdUz921hmx9KjDCQnJT07gJRC7HXwbOaOMgWL49n75vNZlY5fGblMuv07dm9K2S0IhKLgJn46RHG/Pwx3MjnaBf73QPNByqHyxW5idOrfthdrlAsOMTtcjqBzxdAsNFWlHA0KcRXYSMV9DP8wDoMHH21WCbYEDUQqYmDwJi/W8OVfs6nTIN7qlxDT5u4ooePc+XP1QYbesdxFuI7aDs7u/cRE6HlcjmaQKeTRDqQk5Mz729JT0s1UcUIA6XbS/RcLnehXAdM2m0h8xqyuDiIj/cpB0YqSJAOQye7FWx4CDY8NBPGYub0wCOTsCW/E7iSp4jsyIDDSwWe/DvA4a9XMuPfq3IPPdrI2F7T+MnQ1dVdQYh3YshoHCM+zYnCTQVHthYXabDsLzAziwpy504H6/+EcJobwj0uNCVO8Ktf1421tLQsaHuRQGKJhCjHXCKJhEJwTDpgeGSEqAsfNhUWsuqBqmEi5qWrqws2556GrKQ3ADwz6sER7SOEyCfS0wdeppt8iBK8jveAK3tW32d5TpeQmFBB3luJfguaip7ePuglm3PKbHAgvME+rAlJS0stI4qho8QIEyffOFV39uzZirAOGDEnAoEQ+AL+HILgyRvoH2BPlJ8cWPJXWrIeZI4KiBM3zbXlyX8jb+pTG6+7FRjT14ARfh7G4TlQpaSwjyMRkBAYZWC+BP0X/6gthqVoxtwLlAnIZNLqnTtKj4V7THiUFgC/e/XV63r99SPhevYo03j1Yijr9XiB/edlQ1/WqUS7jyOzFiLpqWlpkB1fC4ztGghFDFGdu65ubhJwBL4KMA65D54R4Ey+BKL4R6Hp5gR8dKuVdSxzc3MgV62G7OwsQgohtN++A9ebmtkxm8HBQZaMaFruVg9iakzEzH2VKNeiph7Qmk+fChiIatSPjIxUeBcR8+PJ93hIxHJXMIDZRjxJOFaRGvc+cJ3vTvkqcwXaY6khT1iAK3qakCSOVQ32hFq+Dk7nK1hAPK0cxMeAi5cuEx/Gt6zfOImEuru72YgIkZ+/Xl9aWvqSxWJhTU9cnEyfnp6uC9fhpKYkuIOp/NnPX+wwGAwRqbBCE2Ien4B//eLfwWVvnnJSnSCRusN+D17SH4iD+gnWiW2+cZN1LlGVsFSwm/gs/ogEx27IVl197DvHInU8qGLMqIbpxs2bZeRqu4bjH/cLzGdsyF8zTYpQijEvWSdPwakzfJYQSAL/wF2gP5GWlqZ78snHj24t1kR06iLNfAZg08aNKMWVcXHxEXk/VeLY7HyIa3EundfdRYjQzybOrly+zKqEnxRThCh77lvfLIs0KahiBIF23976tvZ25euvN9SMjAxH9L1dTi54GA5weeH7Mc3NM4qDJoP4L/W7dj380lNPPqFbyuNAiREEly9fPWiz2SEvL4/YdwOJPO5tGUYpOZF3Y3KSD1JZ+KlrJAOJLHQSifjkd779rfrlmoxEnc+70NbWrv3fX/660W63Q1Z2NmzZXMiW8rW3twM+Fk6eY926dSZCquN7H043GG/unlMVHi93krB2YSeUK/m4npf0x7KVmJlGFeMuvP/+36v8BCChHnEizVC6vRT+4bOfgQ8+uKTr7OwEm92uYRhGedeVrY+Pj9Pv3LHz5Jo16Q3+SEcgLapx2a7P2ndiXMiaFTGJUPj8edSIl6tbqemKVDECMDg0pP3xj2tZtVCpVLBu/Xr28U8deobNPCoU8kNJiYkNi3nPib4fHJvo/+G8JXUC4Wxy8LgekCoyTaKM5uKlXraRRiVh4MwZ3bRaZE3NHclV57Cpbo/HY1osKRBx6d+oFcWX6hdySgM39EO8kn+pXilSUGIEhoZer6apqVmL93HACUvwWWLk5rB5hNHRsYZ7eV80BcrMr1SK4raGdZK5PAXIVF+tlST9U+1KHg9KjCmcfvPtwzhcjVizZg17i9lLTEfjINb2kq3H7/W9edJP6RPz/1IsTvhiPVcQepoBX1ZmiM+oOqTIev7oSh8P6nxOobe3l53ngUPlcoVvAlF+/jp2sGzCYrnvJRSnnMhKokzVo90/LQfXh/s4HNeUUyo3SJTadyWJ5fUAf3ogjgclBrALqpXX1P6EPUnpU2ohk0lZ/wJXwlGlJEdswdUpv6F2agtA7QN1TKgpIbh0+cpBTDVjDQX6Fz6nU+1XC0N2dlb9ajsmq0oxMK9w1cSUN5mZg5OMV+3vFDRsN8FaeTYo7KOg4DhJZOCCh4gZwaLenOys6tV4sXBWCyFe63VWtVs8FaF6q/uBvUBKeGbYFu8BQ1e3bs+unWWrkRgxrxhXxtyaH7RMNoYiBDa8fTZ7pq869jk9Y1TANZcb9mQWvLtazWtMK8bpLmvFuf6JOhNPhpW8QffZpuTD/pTZ1wd2TMbmuFxydPar+JVPpwtXnY/BjWWlOGcYrMGpg555Wk61W+eW2aN67E7is22zzwy565azpzolxhLjQudQnXHCxpoPLxN6mBvbZb89OPd5OX9leqpTYiylWhhtFfp+0/QyA94QUwz9QL/iFwZfX3Xsp95m8cC50Zlhceyp/rtuZ9VqIkZMOp9nu8eqYJHFNagc2Fc9FAxWD1aQH30QVu2linFvoanm9ohllux7nfffubCHKAnmQKgpiVI09oxrbc65V76Xcd/3e7dMMPsoMaIUFrsjaL4iEqphc68eBzTmiDHg5gW9qr0OO1CsYmKQKDOoc8jmMu6x2psSIwaQzGOuh3qOsYzRM75aiZGREGcI9ZzHOj7d59SPA5wB2OPpB7WIWfC9lUKOnhIjSrE1WaJLlseFfJ4xG1mC+NFBfFLnzYuwtqURHnPemZcg2xP471JiRCmwQmqdQhS6cJf4Gcz4CLiHe1m/Y1SaAp0GA84VAUdnyzRBcPg9EJvkPEOOjNdAiRHFeCRXdVwqFs27D6bJGZMRBnu6wJW+ll0bHIFLGKFqaI2XoMQzBB6LiSXTziT+qirYiUliYDvKPdlJYRdRTqwpYBc065giR0dHJ2zVbIHd8W54hj8AOxUe/Up2NKTEiCA+vS6hen16cljOog14IFy3hV17AtegQNXAhVxVqmTYu2UD5Bk/UuMsNUqM2PA1TBm3dMQshJe7cK8tBolcwa5FEUgOXPx198M7lL29fY1NzTcrKDGiHP93pvHYhQsXNea//h608U5Ikgjm3X/E7oLUvR9n7yM5cDkjPzlwwlGxpghXzKtbLeSISWJgUc358xcP431cmJXbfwfKeMNQsSUDsuTi0L6GSA6aXY+Y/OTANcKRHO+fPc+ug5WRsYYlxweXrtTFOjFish7j9JtvVw0O+hZT909OVqepQBUHIE9w1ueX5L30Trdlls9QoBTo16UodQDrld+73XoNX3+juXl6IVecSoDASUiELBUtrW3XH8pfXxurxODEolr85w9+1IHtsxUKBXtiEZ94+knWJCSnJC24lIH++oflr7124gSu6Bu4yi8CV/pFclzTX8eFYCs3F26MyWiFG4tqgaRg1SIri73NJCYApxzy+LywljLQFG1p0Gr3ViMpcIYaKoe/bSYqB5oV9DmGjMa6WI1WuLGmFs3NzaxzGDg5Ga9wnG64mKUMHt1fduyJJx6vn48cO7aXwAcfXDkRi4XCMUWMc+cuVPjVInByMjqNuCLO2rW5Jxfzfo9/7LHK+ciBK/Wq1TnK9/9+/gQlxgOMmx999CzrUZMTiUsl+dTCdzFbrTbDvayIsxA5cNF3o9GoudXSWoONadyj/1znHv5CI27YoMbjuBqVdaIx43yOjI6WP//890/gycNIxO9f4PpZuErv0NBwNXEUj93r+7/zl7/V/fnP71T4Z8X7HVJUpI15tyEn4X/A6+6cObC8dOCIP+5bG5wjMnAlzxzlxX25gSrGMkOne++gf9XcGbXwrZ/V3z9oKtxUcF+hJSrHU089UYt5Eb9yYOejknUvQ3b8N2aRAsFT/Ay40q8AT/5D4IoPqRnzcydQQSgxlhlEzlnJDlw/C5cywBCVx+Mdj8R8kAOPPXr04MFnKlNTU01IjpL1fyE26q+EKHMPo9d1dUY9BFuBK3oSGMsLVYQcFZQYyxeNaLq6utmEln/9LJUqhZV6Q1f3fatFIHaUltR/6YtfKKv8fJ5BKTg19flBeqVZasA7+ebMd/T0s52NPLZXo2K6IzcGSKE1Df7+8O7tDBQX5ZJoJN2nFut9C58o5PLjkZ49lp2dpc9JapyepuB2BXHVvBPATHwX3MYd7OZ1TPUscXcoGdM3Dz/ox5UfpWRQesa/d8TjOH/Y1SNVYk7ywLYp2ebnwLD1cXB7NoLdPmnYs7sg4mlrh8OlHWlOU858n0W2m3C3oNk7SokRQWB3wfGOx05IBOfUwQ96JySJfkG08A+QoPm2jsPZH/G5ps6R/9IG/u1rN7GInqfeSWpKIq0U5p4XGq1jenUwh28WiD0XTv5bxXJEAria72JVgxIjgjAZvlY3OfGhcjHy7bH9psrfw3QpYbfxKTFWKvJwmN9ZdBYRTYt38kxEnT2u9NE5JYM2qwAWVLHp+FVsoMSIlFr0/Ge5hzEHhH+LIUd7RHMHUsU2nUBSOOdx85iIJchCasbhZeooMSKlGK62WZOVw7468bWO99iwNlLfBcNfUXxx/VxV47DEGDFKwDQqBrNJzP4duHm5OcBLeKGaEmOJ4HSsbC/h+Myao+L4LSEjHiQuOqV3E4PhfbJ2JdtNxAwxMEv4u9//sW5wJE5794HHxnMrBVQNSfLhMoE4J+xwWJr8pXpp2n8cjYYLj/MAE0L55lt/rrp27doR7Ez81H4hFGX9cnYShu8BRYKDnKT5uxJyRHtBoHqHs1TEHev4ct2kuVELnvGg+/CE2SBN+lx1/JpvHoMowQMZY91qaa347xd+WtPW1q70EYAPI9ZitslLoAOKqoG2HLsSztd8jsPLaFhC5TAQclS+8vKLHRlJtyAjjQPJ8tuEDRngZFLI90o9mpj1tYZoMB8PrGKwa36/3nDi7NlzWv8QOo6WYm8yJEfphgsgcYeu3MfeYqgiqCC48QVeEIjigJ/0xzKueO+SRQIXL1468pvfvlqD93ft3s0+hsXHWP63uXBjVGa+HhjFwMpsohJ1gSqBxTbpAd2GEjK/DszgpVltsQPh7ykWCGXGZ+uFS0gKxJ2ODjZiUkzVmCKwgCea8UA4nzhrDMv1/aTA4XKskPKTAqu895ftBQ5XAd32aj1PFJ7D53P2flK51N/fYrGwmVV/HUgsYEWJgabj1Om36k6ffqsK53AgkAxFGs30PI6tmiLYs/thts6yte22vnjrvjLVpivF4oSDulD9xbC3mDzr+0eVOTWVy/Ab1MPDw2qWGGLfLDesBYl28FeSFC+/8tvGy5evaPymY8OGDdMl/yjFjxBCKIkJQVtttdrqd5SW+E80sqgMT8p4/8/LJ21GJcN4QCIVgTD+gF6mLGlYxt5ian9lup/M04ollegpMe6DFGibHyKkQHL4TQfO+MJ6TexJRhC0kDegv1gA/n1Zf8u5cxem8yt+U4KV4wibzW6ixFiYDEgC9CFMhBR1flIEVnQLCREKN21kuxeiaWlrv2PKyck6lKpS6R7UAzhmMilmHE6fYggEQvbWbrcbKDFCKIPFaj3idLoODw0ZlR6vFyQSMWj37WWvrpHRsenmdBh17Cjdxh5cVAni0DXs3LG98kFf1H1iYmLaFPqBC67gZCSJRNJJiRGEFJ2dXY3EIZuuhRATMijkct9G5HZkZBT0+g/Zbsj569cT57INxicsBmJKjhLTERVzMOw22xz/ApVvaGiYqF+BLlqJsWRRyZWr+sbbdzpmFci43G4kDHsfySGVSmHbtmL2IJ49d8FEJLh63yO7i9etzYue1fE4HOXdoSo6zFYbO1uNmpJANDXfqCCmY07VFMMwMExUAs2J2+XLbEpIiLduXV792rzcqOwFwuVyNYGhKppEnECNyhdtafAlJ4bL6XrWf99GpBaVIZAcFot1+m/0O1QpKaZobRDjcDhg7do84h+VgipVxZoRk8kM2VmZJjSn0fq7loQYboaZVovJyclZxAgGxsNoovHg4Ylvb78NcmIWPVMmEv0o/L1xcXGa0TFTh8PhPCQSCaPO11gSH4PP4ykDvHaIVbS2tteNEXXwkwLB4/FAKBSw5lImlSjN4+ONdvukhhLDZx6mM35Wq42V1nm/BIcbdbZ4cHCooqe3txwVMRBWYjpJiM6aTP9mn7SfoMRgTzRn1gIlfX197Gaz2YLuLxQKo27x9u6eXrbyHB3Nu4E+lHF4BB3QKT/EqXY6XVG1TsZSVTUpz1+42EEkVLnQvpmZGfqH8tcXRxsxSHjt9atFXl4uiMXiefePi5NVx8fFHVvVioGeeE52dmVgNjAYiB02KRWKSohCBJqQUEoYzViyBFdGxpqGDQ/lFyclJQb1H0i8r0tLSytOTVVF5QhkoEIYjcOsLxFLWNKxkqmTntvUfEMjk8nK+/sHIDk5CVVCF62E8EMkEumJamj8uZnOzi7IyspkR4SD7i8URdXvjbkFYJcLU9ndumBKwuNxQSqdGTtRqZINaampuZQYq4ccjYQc2nklma1dzSzLy1XrqI+xSlC4aeOhxMSEhnlIYVKpUg5FGymoYkQIdzoM2r6+vmcxXxEfH69xTE7qiU/1bnFxUW20jpX8vwADAAJVnZET/JKBAAAAAElFTkSuQmCC';
export default image;