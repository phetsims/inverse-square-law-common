/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACXCAYAAADQ8yOvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAG/5JREFUeNrsXXtQW9eZ//R+Iwkw74dsAzZ+IYydOG1tRF5uk2yC0zZNm7SBzrTddpqJvX9sZnY7a7ub7EzbtLbTZLNt2oCbpJs2TUzSbtqkSZDT2E4cGysG7PgBCIPNG0lI6H2lPd+BCwKEEAZsI86PuSPp3st9/s73Ot85nxAYGKJAyB4BAyMGAyMGAyMGAyMGAyMGAyMGAyMGAyMGAyMGAyMGAyMGAyMGAwMjBgMjBgMjBgMjBgMjBgMjBgMjBsMND3Gi3lg4HDaZ+4JGNxfWRa6/K0NiFggEZvbqY0OQYGQw/G+Hf3e/L1z5mZPTTbdfoVoE6XJB7Sa9+GCRRsRIksjE+L8u/56PBoK7B/zhaffRSgSQqxCCIxCGXl8YhOTuy/Si2q/nSncRKWJndEggYhApoXvunLO+yS0yxtoPSfFdg2zsty8EcGQgCCftQTCohNbb0iQ7yvRiC6NEAhifSIqffdpf39DebQx53TH3TRJPbAMycue3LhOTRQLW4ZDhjSv++pO2oJFRIgGI8dwZW/35Hht9meEQF3PfoWCYSonJKNOJqDQhdonu7z2BeiQbo8UiJsZfOj17Gi4PjrXwcNAfc3+0K97vC8SUJpfcId3Bdn8No8UiJQZ6H0c6BncTMTG+MhSe8f+ahjh4pdNPDc9IwkT+bnRwleednInFMRYhXrvkeazP6bmq/+3whODgJR9VHygp8HckPFwYPugL7CZfzUxiLDJ0DHmqJkgLamMEZ3UMlBSTScGj3R0yoVRixFhcasTY7vBOMRDDHDdv58BYSIN9aauTRUcM8sKMw77ohmY4GJi383R7Q0xiLCbgC5uOAPNJjC5PqJwRI0EQ8nuAgRFjKjF8XphslDIsEWIoRQK7QCyZdjs37JyX8+ikAgsjxiKCaZnYIhCJpieGxwXhgG/O50mRCtsZMRYRMMmmOEUVs4s84BicEzlSpAIkYB0jxiJDmkYR+6UROyNg74eg03ZVnkq2QmghBLQyYiwyfCNfsXdZkmpmY9TrhoCtFwKD3ZQkvJqhS4yA2OZk8YGlbnwuyr4SbM1/anfv/5vTszMeLwRJEOZG8jWmowMatGKNHspS5eYyvbiWeSWLFF/OU+wtSE+eN3GPKidFzNlL9eJdzFldxMTAHM078pJ2pKckz0uuplqthu25SdUsvW/0+S72G8B0vHfa7Ydaeu2GqwpuCYSQnqyzfzFfW711maSOUSJBiEHVQDisq20Zrvm021HpGh6OX1zKlXBbhhy2agK7srIy9zM6JBgxeGDm1ZEez2OdQ57KDrsbQuiqRkoRIh2ExMhM1SjAIA3CF5JFUJyTBicbLOZNZaUVOEgpWtyEESNBgBKkwc5VYk9sny9cEgyFdfJwwDBw8h8GcNkgTSWlt77ckA86bRI0nz0LLqcLrO1Tg52G/HyQyWQWvV5nvvOO2w8slfiGYKm0AEzw+fcf7T7ldDqhqKgQ0jPSoaurC+x2R9zH0Om0kJebW1d53727Ep0gS4YYiOd/80JbMBg0+AP+GQmh1+thw7p1kJ6WBsPEbrHZ7XC6sRHQhkGClGzYsNdUvm0PI0YCqJdDdW+eamxqMsSzf/nWrZCbkzNl/emmJkoQxJriYvNXvrxjRyIObxQvFVL89oWa+paWFoNMLicG5czhG6lUGnU9ShFKEEKOM2fPmmoOOnGQUsX1JkdXdw8azo+RxSgSiZD8Vo7j0HA+mJmRPmsDeknMj/GHP7566MKFC0byoCAYiC+bvKOzc9ptSA6eOB0dnca6N96suU5kqCLLIbKcIj/ryVIpEYsNy1JTgCyGZL2+SigQ1JPt+xgxJqHebN5zymLB4QD0N8fFR4zPzp2LSQ69bjxR/XRjU+WVlqfCgd7t4WD/Q/Wc44k9Czn8gLxoI5KBvPQaIh0qUUrw20LkPvl7lUolIJbQpKadsyVHQtsY+HKe+vkv2vr6+sbWkQcJcoUy7mNsWL9+TH3w8Pv9UPfnP9NPHhnpqfCdh4uAc+yEcPA8CGTbQKTduz/sfZdauQL5XRaBtNQ8V5VDXjAysg2dJGJIQ0tLK+Tn54GcqMix1i4QgEwug3AoDF7fhLyUinjVSkIT4403/1xz5MiRqsnrVWrNrI6DaiM3O5v8n5r+bm1thWgR1nvv/jxsWDUMoeGniWhqJwRpB4Eok5DiHkoWgCD5nVcnSv7tVbu7hBiotug9dXf3wODgICQnJ0MGcb/jQC0hRvWSJgYanL985llbZxR1MFtixIuv3iOGgjQisUPjrrA49V3ylEfPF3YCZ/8B+eIDofLhapH2R7VRrtsU9UUJBGaUFleuXLGlp6dTydfe3k5caTdIiLooLCyI5xIthBilS9orOf7JiarLly9H3RYKhUAoFEYNYOm0OqKXxfRhRyIQCFDD1ev1QndPz5T/vWOrFwpSnyIHn3wyF9Ffo8QgBBHIyolEeR441zM1rv6XSpzB2w1KpdJAjmtMW7YMeiPUnt3mgGH3MPT29sN79YeJpGqj5+e4EOTm5ky4NozL4PXPgLjn/0hYYrS3W8t5I2xKqyTEgAhibNu6FVBfe8hDxxaIKFi5ErKzs6iRiSTBh49BLukoYbp7etEjgb7+PtBrXFCY+gRp7QLSsieeM2j7JojUuwg5MkfO7Ts8ShgHyAJP7FRlPER/Jmk05OWOmB8BP55rROqolCpyHVJKGLwGlUpFie1wTAzQ9RCyajRqKkliSYwlb3z+9oUa27lz53TRbQYZSCLiFKijkSxenx+0SUmQpNVO8D5UKiVpjTryXTv2faxVk5fp6foXAM+bREX5QaGc3eDqgeCTYD6eN3YuCfEkUHLgufA7kgQ/IyXIufMX6e9U4paiockDDVC0NYgEGluHEsbr9VFS6fW62tyc7OolLTGIBJh2Zhx0WSUwTgw04Eb1O3R2dNBPLSEHEgS3YSuVyWRT3FUU3Wlpy0DpP0w1iM8rnjUxUlVvQ072btqhx5MiUkWglEJVgmF5VBc2+7hTg6SRyaQTSGC1Rh/1MCpJDi5piYFu6k9/9lTbwMDAtPsoVWo06KL9L3XzbDYbRKoiJAYSBD0TlCpK8l0sFoMh2wP5ip3j0ifFA0JReFbXK8kZUV+oLpAEKIWQALxaiyA7uAlBHENDMOxywRD5NJnKafbZTEhKStq/edPGuNMWE1ViGOz22OEClBriKCPakCwCkQCyc7JpCxQKhORl9YLP56MLSpCOCLLo5GrIj+hS8RKpoVTNbsjCx8dPQNuklo4SAs+Hn0PEnsBr8U2MScCaNcW0sw9VCPYaTxuMIypkY6lxVrmsiUoMC7p0xLWbdoeA3x+VGJFieSSSGKJGqI/sLxKKqJTgvZ0Rskw8hsc9ok4mG6Gx0NvbRwzZDqKKRl7+ZMMyEikpKfbMzIy6tWvX6IJBrhLVDS68F4UqQyQSoudCWkbYrNEkHdiwfq15tg8wIYmB0cVfP/98zH3QsueIaBaJZ34EvtEIJxfigPNzsHLlCirWMcglkaknqSIBaeEy0Oq8cV+vta0NOi5dmpYIyXo9ehOH1WpV3be/XWWJCHYZCPmr0PZAchCVYs/Ly63LzEi3zvUZJqzxKZcrLDP57T6fFxQiVVRbIxZQx/Nqp7NHDWX5WghxjghpJKTk0CT5p5UcgcCIWylRrIOBwcG9/PrCggLyglVWl2vY+uijP7DGipCOEmDPgjSuRCUG9ngePXq0aqb9MNCFfSezJUckHvmnsyDl/hp1m1TGEfUTGjUehYRAAvo5ZgSnfqtWl7+v+kZ7fgnbu3rT5s1vCIQz3x6qFK/HDdwc5vA61lxKPJHoUUe/T0Q8CQld8HskKUTSPBDpn9x7Iz6/hCVGVlZmXfHq1XHpWp4clCDB4KzPdb7VC1bbA7N78IRIypQHqzVJSisjxjVGfn7ewXikxrgLyxFvxAPDLiclCdog6L3ggoTB7ZOX8OjwhLc/1IB02W7zdJJjwkOX5IAq7XvVmqzHa29YAx4SHAd/92Jbc3OzYSHPIZFIYf369ZYHv/bVUp/zQ9Nw3wu7/a6TplCgcwohpOoys0J37y5FcuUNPRQy4YlhtbabfvfiS/Uul3PBzpGamgp3331X6do1ayzjbmvY4Op73QTBi5SUnMRk0abetGjm3VgSWeLv15urPvjggxq32z3vx8YOq23btlXfWmGqTaRntiSSgfGlbdmyZX9kr+N8kWL79u27Eo0US4YYiC9uv3MXtmwU+/OB7OxsePihhzCQlpATxS6pkWiI5jNnjKdOWWoaGxuN0yXyxHxgAgGUlJRAYWERbCorpT2hFy621t60uayaESMB0NjUVGWxfPrY5cuXjXw+RixgMg/maMhkclAoR+b/whyKm2/aRHtG7XbH/o2lJbsYMRIE6D0cO/ZRZUdnR3nAH9ANu910DApKBpVSaZZIJfbcnNzDNpu9/G9vv4NjOKCgsBDS0tLo/yMxkCBNzWfxZ/X6dWtqGTGWGIF+8tOfnyIShmaGlRiNNHFnxLjdRjOvjhz72J6Xk12Rl5e76KdrYiW847ctrBUVpl0azUjGd3NTE+16R3z44TFqa6wtXqWztnckRE01RoxZgKiN2vLybVRVICmQHAh/IAAfHz9JJYherzM2Np3Zw1TJ0lMput+9+HL9iRMnaa4H2hpocyBysrOozfF+/QewpnhVKY79eKs7UOkIhPPdwZGxrEqxwKqVCNrvypDUESlkYcRIMHvj5784cKq9vZ3aG8uXL4fMrCy6bd3aNRBSJsEnnA7OuoW0+F40KEQCWKESWrekiPfeiBPOMmJcJS5d6jD+8dXX6nlyrC4uhsz85TCQWwKnAtGns5YJBfCldAnIR8cEYblPXDZoRZbNyeIbao5RZmNcJdDzuP32W6v5wUeDzmE4nV46LSkQm/QiKFQLIVcxsiBJcDnt4Iw3WglxRow5wFiyoe6ee+6uXlG8Bjyb74LL3d0QjjH/Bpb0nIx1SSIo04lpCfEbiRyMGHPETZvL6rxlX7L2uUfHksQgBq86JgOlCALJ8V5v4NCNUF+eEWOO+Eu7c2drn90wZpj6Yw8b+GtPAI4OBsEXmkgYHtbhkIF4MjuZ8bnIXdcnP7rU1j7oHGvhIo0ehOq5Nfg8pdD++Cr58us54RuTGHNAQ7+nMpIUlCzzUI/tkjtEZzZmqmSRwtLluG+KFOGC83Lsc06unBFjkWI4GJriQYQD/nk59lAgbGTEWKTw+/2GaOuxFttc4eGAESPhjFLv8KK/BzF7jXOAKPrjC3lcICTeiWDS9hyFEG6xNYFNKAeHIhm6pMnQ6YlelUkkADsjxiKFWhQ2kw9TVHIMDYBIP3HuTSTBBVcQFH3NIBeLYZVEAmUpqdCTlAOd8rQJJFGK4Lr2mzBVMgekaNTTvjy0Mzh735T15/VFcPZiK50pB/M4Bru7YPnwZbi5+zjc7m+FYuUIOa53bXlGjDngKwX6g0rp9LPyoEoJDnRNiIa6RXLQbKukST58EjLOqJOTlQV3rlsBpmAH7Aich9s13k+v572xyOcc8avT3fUnOvpNMz5oiRQEUjn5lFHbI+/ih3DluBly8/IgNzeX7oMzAN68eROdHL6trR2cLpe5bKOx+noMa2TEmCOwQN+zx1vr3d7ZRTyVEhFktByDK2cb6dAEzALD+b1wgllM9ikqKqDTJzU1n8FB03vXr1uzhxFjkeHVC4P73rnYvRNCs6v7mqKQgOxYHQz2dNMZADHZh888R+mx0biBTjZ7+fIVuHyly3LT5rId10p6MGLME37/WV99fUuPabb/lyoJg/STtyg5EJFpgpHSA+f8tJxutGekp1UXrFxRx4ixiPDSeVvNJ9buKndgdtM2LddIQXP6PTh//jz9HalaJtse10q1MK9kHnGHLnCw8IoFVivjVynrlqmtXyjI2nHfvfeUrly5kqoJ9FYaTp6kE7/yXsvb77xLP0uNJejq7j7+yckaJjEWCV57va7GbD5chd+/eP9XoU+shn6xBvpcXhj0jUiRZJkIlqnloJdL6krSNG9sytLW8v+P+R2v/OHV+qNHj431k0R6LVS6GPJhY2kJ/OPIMVAqFHVbbt5cPV3exmgmGB7LOlvbhBFjnjBSOOe/2y5cuKhDVYCGJCXInbfRQJZKqdqrUinN8bwkIh1qDh/+oIqfBhoNUjweP9E9TnBfWrqBTjVNzmX+wue2VERch4Gz/XB3OGithFC/Lhw4DQJxPoAon7jJ2XVCVdUBoXybmamSa4SOjs7KtjYrTdrRjpa1QOMRvQosJ0FIgQOMzPG03O133l593333VmdnZ1NJgFHSTy0W6BqdAhsnoMdhkVKJFM9r4tUKFukLdhe3hYZfqAr73qekoK1ffj8IFV8nBCmt5Bw/qseCfjPllbK+knnCJydOlvNjWZNTUugnzkFOX1iIs8921BkOhyQvz4zq6ciRoyY8dltbG7U/+JFv/tGJ9Fta26q6W35hcnbtMUSb4F6oeHDsu0i6ETjbN03B3tti1otlEmOeYLPZKnmxz4t89CYwSOVyDV+Ve4nS5Stf3lHxve99p7q4eDV9gTgBfaT0QBTl2yBkf9KAE9xHQ8jzSsRBNSPF+/zHjNzAw4eYKllY+8LY2tpGRXNkdSQcy9p5+QpkpKcdnsvxV68qqv3+P393+YNfe2BvYWGBnZce2N8iFokgV/Ps6HVENxlDrn3ADf0rLbvFLyOEed3EuV+rYqpkgXD8+AkTbyjyE6rwtdQwMLVubfGcA1KjIh8L/e4/evSjnY1NTY81N5/RiYInIejtGCcBJ4haSAfJwPmm8jPsfgXLftcyYiwAOjs7aeIuBqT4kDa6lUgKl8tVN5/DAHiC4PLZufNVGu6Xu8EDBn47zlUuFcUfYAsHL+FcZLrJ18hUyTzAMTREXwy6qTzQ8MQoZXZW5hsLdV5UMTJxuyFyHV/uIm5ijHguRiYx5hEh7wemkOcv913u+sj4uQ1eYnR6gCN/Dt9Wut3t8WBhmdpreU1Y4UClnvtxGDGuAsRgM4bdr+8LDjxgwvqpmTj70qTizx7b/bAy/9EFJ0U4LMO4yJjU4IiNwZffigtCaizbmVcyR3gG64y29ifq/c46U2Sp7slQwOuQJa/ayTmeqFrI6xFLU6fER7A2SmRdlJg2i6QEosVYGDFm55Yahq78uN7vvqRDkT2zYdcOIfdLNShhFuqa5Nrtb0y9TgHYB+XgGpLOaHMIxAVRpRrrK5kFBlt31nhtL1IJgBHGeMtoChX3m8WpL1cs1HXZWh5o89jfM8TaR0Rc2MlurFqbCfLc5uXRwvRMYsxCWgSGD1+VWgj53sNJZRdOaui/sUMsz41tFxHbA4v4RS5B8SN7p+u7YcSIE8N9z1dy/vESmBhIip8ZDggNPblgo9exKI4244FqkSw/rngJLbuV+q1aTdbje6bdh73y+BDwDUzojYzXuBuPF5xd0NHrspR/q03K+o8Kuf6+mOW3xKoKqyZ7946ZKjcydzVeb8Q9MQucL5U52zruC4nRcloV5FqNTQ3PHRKFzhhUtAa9CGSqEvCE1kNhkXE5wJ9mlirslccHjUYxZR3WcY8bQp31mhFEKbOcaFRCzZ9UYD65Do5/toUYIreCc3gsq4sRY97iBep7rNHiBb44ySGQrL1mI8vQUO4f6KdeCl+iXCKV0KJ+APFNr8CIMQMuXeqofPHFl+sPPPfXGk60ccp255CUxgtixTUwtU6o/n7dtbrmQZvNiInDCL5Tb9YNgb366MCey2PHPtq9b//TBj4zq7mjHDZkNURVKbxawXLdAtLcRMIQtT+whLdUfe/+aznM8OOPj0eVCphqyIhxlejp7TW9/755969+9byJJwRmZC1fsQJs7mQIyr4GYt8fpv1/3lsJjApjTvh5i0L3k70AP71m9+BwDFEPSKud6J3o9FpGjKvQy7p3/v7evmeeea7Kbh8PB2D6fmZm5tjgHwf8EAyZ+eDsmvlFSzXbLcmFL1dc62kZPR7PnCeQZcQgsHx6uvK5//l1zdmzn409UGxtmHTL52+qVEpacgIzs46fKLevzi+sCzl/bwoO1xsmH0+i3maXa7YcGAkg/f7ax1wCAapKRKJxuwcrMJ0/f5F+MmLEgb+/+96+1147tJOXErzaiEy6WVVUQMeQ+v0BQooGWt4qNXsL7ZH0+QIm78BvjEIYGiGV+lGzJgnHjxy6bvfkGx15r1JPTMzA8S1MYsShOnDU11tv/c3I2xI4mBhHffFqg5cS2Mp6+/rAar1k+fwtN08YcS6TSQgJwDx+5Mev930Zf/yf/wUxjE87I8b0LqjxwNPPHmppaTHwLh2qjUjXDiUESgpM6EURPOx27yckWQzlM3WBUckgHlUlvDeCEiPe8S1LjhgNpywTCtBMHhvKjyxHaYFSoqXVal25wlC9alWhebHcI45ci4xh6PS6CeuXNDFoUs2QczcX4kzh8Ejqm1AoMH/80XEjkmKylMBWVVpaQrO7kRCYyEu27b3l5s37r+dk71cDXjVOMkghyHHmJU0Mp8tV1dc/UMNx42n0qSnJaKWbtm79PKxYuQIaG5vHjDFUGUWEJEiID48cQxsDR5Hvuh5zXy0E9DotHfhEyB/3/SRcSLy1zVrV0GCpmSw2sfIyLkqlkqqLsrJSKiXwu83ugPfNh6G/f6C2qKig4pYtN+1YzKTgXeyxfhKJlM6todUmfbokJQZ6Gp+caNiHohRFp1wuH9s2aLODmqgN9O2DgSB9eAaiNhxDQ3adVlt7q2nbgQSREHYsGuzz+cbUZCDgp9KQGM9LU5W0Wdsrnc6R+iFe4svzVZURqFYICSbsv2K5AQvo6hPpGaDX8fTTzxLp1z/+XNraQZ+sn9WI+4QiBlEF5ePG1szlIfx+P/X7b+TCuFcDkVgEmzaVweduuRnU40Eund3uOKRQKA7IZFLzkiKGQiE38IOLnU7XjPuHwjT7SpdIzwDVaV9fv5ULhQw8+eVEbeqIAUq2VQ45nZUOx1AtsTeql4zx6fF4rZGqg5+SedqbF9CEXnsiPYOTDZb61rY2Q5QGQI3vJKJe3R5PFXHl9y0ZYqSmpkwY59/d3ROTHGKJxJ5IaoR4ZHscDofRO2mWYpQaRI1Qg9Tj8dB1Xp9vJ8Z6loQqWW7IryN2xj7eAOXJQUQr8VBkxBORj/U4Yqg7JyfrQCLd/8DA4CO8tJwMQgS6REpUom5xboxdCS8xMEJJpMYuvhMs8iHgXBUoPfqI24YLIY+FuK/7E+n+3W63IeL7jPtzIc64JFTJqAtam5ubUx0Zw5gMrVZrIcSoWGyh7pkQGQonNsScjpWQIXEkB9G35sGBwceIoWUikoG2DH8gYFaplAfXr1tbm4j3jY3B6x2pjYKTuKWkJFOVyYgxkRzW6fRnokImk1kIMYy8+rRa2+nMPtgNEA1SiXTa2X7YaPcEQk9Pb1VT85kpc4yjwY3G9ziB5BjXsBvy80rZoOYlgPT0tNqMjPQp41d445tf0Ah3uVwxe48ZMRIMa4pXVxPPrDaWHZKWtqx6JjuLqZIEBTG+Tf39A48Q78tADFAdedF2nV5nUalUB0btr5j4fwEGAEBZkTy6G38SAAAAAElFTkSuQmCC';
export default image;