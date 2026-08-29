# Typography Referansı — HeroUI Native

HeroUI Native'in `Typography` (kaynakta `Text`) bileşeninin ölçeği ve her kademenin
işi. Bir metnin hangi varyantla yazılacağına karar verirken buraya bak.

Kaynak: `heroui-native@0858b02` — `src/components/text/` + `src/styles/components/text.css`.
Değerler Tailwind v4 varsayılan theme'inden geliyor (`1rem = 16px`, `--spacing = 4px`).

## Ölçek

| type | font-size | line-height | weight | tracking |
| --- | --- | --- | --- | --- |
| `h1` | 36px | 40px | semibold | -0.025em |
| `h2` | 30px | 36px | semibold | -0.025em |
| `h3` | 24px | 32px | semibold | -0.025em |
| `h4` | 20px | 28px | semibold | -0.025em |
| `h5` | 18px | 28px | semibold | -0.025em |
| `h6` | 16px | 24px | semibold | -0.025em |
| `body` | 16px | 28px | normal | — |
| `body-sm` | 14px | 24px | normal | — |
| `body-xs` | 12px | 20px | normal | — |
| `code` | 14px | 20px | normal (mono) | — |

Dikkat çeken üç nokta:

- **Bütün başlıklar semibold**, bold değil. Bold ancak `weight` prop'uyla açıkça istenir.
- **Başlıkların line-height'ı sıkı, body'nin gevşek.** `h6` ve `body` aynı 16px ama
  h6 24px, body 28px satır yüksekliği alıyor — başlık toplanır, paragraf nefes alır.
- **Tracking sadece başlıklarda.** Büyük punto negatif harf aralığı ister, gövde metni istemez.

## Her kademenin işi

Bu eşleme HeroUI'ın kendi örnek ekranından (`example/src/app/(home)/components/typography.tsx`)
ve `text.md`'den geliyor — uydurma değil, kütüphanenin kendi sözleşmesi.

| type | işi | örnek |
| --- | --- | --- |
| `h1` | Sayfa başlığı | Ekranın adı. Ekran başına **bir tane**. |
| `h2` | Bölüm başlığı | Sayfa içindeki ana bölümler |
| `h3` | Alt bölüm başlığı | Bir bölümün içindeki kırılım |
| `h4` | Grup başlığı | Kart grubu, liste bloğu başlığı |
| `h5` | Etiket başlığı | Kart başlığı, sheet başlığı |
| `h6` | Küçük başlık | En alt kademe başlık |
| `body` | Gövde metni | Varsayılan. Okunan her şey. |
| `body-sm` | İkincil metin | Caption, dipnot, açıklama |
| `body-xs` | İnce yazı | Yasal uyarı, disclaimer |
| `code` | Kod parçası | Monospace, chip görünümlü |

Kural: **kademe atlanmaz.** h1'den sonra h2 gelir, h4 değil. Bir başlığın kademesi
görsel büyüklüğüne göre değil, **belge hiyerarşisindeki yerine** göre seçilir. Küçük
görünmesini istiyorsan kademeyi düşürme — o yerin doğru kademesini kullan.

## Ortogonal prop'lar

Ölçek `type`'ta, geri kalan her şey ayrı prop'ta. Bu ayrım önemli: bir başlığı
kalınlaştırmak için başka bir `type` seçmezsin, `weight` verirsin.

| prop | değerler | varsayılan |
| --- | --- | --- |
| `type` | `h1`–`h6`, `body`, `body-sm`, `body-xs`, `code` | `body` |
| `align` | `start`, `center`, `end`, `justify` | `start` |
| `color` | `default`, `muted` | `default` |
| `weight` | `normal`, `medium`, `semibold`, `bold` | `type`'tan gelir |
| `truncate` | `boolean` (→ `numberOfLines={1}`) | `false` |

`align` içindeki `start`/`end` RTL'de kendiliğinden dönüyor. `justify` yalnızca iOS'ta
çalışır, Android sola hizalar.

Alt bileşenler `type`'ı daraltmaktan ibaret: `Typography.Heading` yalnızca h1–h6 kabul
eder ve `accessibilityRole="header"` ekler, `Typography.Paragraph` yalnızca body
kademelerini, `Typography.Code` ise `type="code"`u sabitler.

## Bizim ölçekle farkı

Bizde ([`src/shared/styles/typography.ts`](../src/shared/styles/typography.ts)) ağırlık
`type`'a gömülü — `bodyMedium`, `bodySemiBold`, `h4SemiBold` gibi. HeroUI ağırlığı ayrı
prop'a aldığı için ölçeği 10 kademede tutabiliyor, bizde 21 varyant var.

Bu fark bilinçli ve gerekli: HeroUI NativeWind ile `font-medium` util class'ı
ekleyebiliyor, bizim `StyleSheet` tabanlı yapımızda ağırlığın varyanta gömülü olması
gerekiyor. Yani **ölçeğin şekli değil, kademelerin işi kopyalanmalı** — yukarıdaki
"her kademenin işi" tablosu bizde de aynen geçerli.

Bizim varyantların HeroUI karşılıkları:

| bizde | HeroUI karşılığı | not |
| --- | --- | --- |
| `h1` (32/700) | `h1` (36/semibold) | biz daha küçük ve daha kalın |
| `h2` (28/700) | `h2` (30/semibold) | yakın |
| `h3` (24/700) | `h3` (24/semibold) | boyut birebir |
| `h4` (20/700) | `h4` (20/semibold) | boyut birebir |
| `h5` (18/700) | `h5` (18/semibold) | boyut birebir |
| `h6` (16/700) | `h6` (16/semibold) | boyut birebir |
| `bodyLarge` (16/400) | `body` (16px) | line-height 24 vs 28 |
| `body` (14/400) | `body-sm` (14px) | line-height 20 vs 24 |
| `caption` (12/400) | `body-xs` (12px) | line-height 18 vs 20 |
| — | `code` | bizde yok, gerek de yok |
| `display`, `subtitle`, `*Medium`, `*SemiBold` | — | bizim eklerimiz |

İki yapısal fark:

- **Bizim `body` 14px, HeroUI'ınki 16px.** Yani bizim `bodyLarge` onların `body`'sine
  denk. Ölçek bir kademe kaymış durumda; karşılaştırma yaparken buna dikkat.
- **Bizim line-height'lar dar.** HeroUI gövde metnine 1.75 oranı verirken biz ~1.43
  veriyoruz. Uzun paragraflarda okunurluk farkı buradan çıkar.
