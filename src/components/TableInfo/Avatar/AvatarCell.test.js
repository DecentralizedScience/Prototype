import AvatarCell, { GreenBadge, RedBadge, YellowBadge } from './AvatarCell.js'
import React from 'react';
import TestRenderer from 'react-test-renderer'


describe('<AvatarCell />', () => {
  describe('Renders the status with correct color', () => {
    it('Green when one review and review declined', () => {
      const reviewsGreen = [{
        "id": "MzYyODc1MjU5NA==",
        "dateAssigned": "1566479462369",
        "dateCompleted": "1565209759215",
        "dateDue": "1603740536999",
        "declined": 1,
        "quality": 1,
        "recommendation": 0,
        "reviewComments": [
          {
            "id": "NzY4Nzc1NjQzNw==",
            "text": "Quia ut atque quibusdam labore. Quia in reprehenderit dolor ut. Asperiores ea et sit nobis maxime quidem non. Error aut quia aliquid fugiat numquam vel et.\n \rId rem error at ut sunt illum et et quo. Eos tenetur et. Velit et voluptatibus qui sunt.\n \rMinus eligendi veritatis commodi error odio voluptatem omnis dignissimos. Pariatur numquam rerum nemo aut. Est et sit alias qui cupiditate aut enim."
          },
          {
            "id": "NjQzNjYyMzAxNQ==",
            "text": "Nam at odit fuga. Recusandae quas doloribus sed. Perspiciatis nihil atque perspiciatis architecto et et aperiam et. Enim saepe qui possimus tempore est earum maxime. Quia aut et sapiente repudiandae molestiae culpa et et excepturi.\n \rCum aut nemo aut sequi a sunt repellendus. Ducimus architecto magni id porro molestiae. Molestiae iure omnis. Iste quis perferendis quaerat perspiciatis ad blanditiis.\n \rTempora at nesciunt a possimus minus sit error mollitia amet. Architecto a et iure. Totam libero iste illo et."
          },
          {
            "id": "ODE1Njg4MDc4Nw==",
            "text": "Neque laboriosam neque vel accusamus est quia voluptas. Dolorem deleniti dolor repudiandae vel placeat doloribus autem nihil. Modi quo iure similique ea quia provident fugiat eaque. Assumenda et nesciunt aut odio qui beatae itaque. Qui aut animi maiores nam quae mollitia dolorem. Sunt porro voluptatem vero minus nihil explicabo in.\n \rEst sunt tenetur temporibus aut dolorem mollitia voluptatem nisi ullam. Minus dolores ut et maiores est accusamus. Dolore autem similique voluptatibus nobis doloribus illo.\n \rFuga labore laborum sed. Voluptas commodi assumenda quidem rerum autem earum. Est voluptatem impedit similique laborum quod. Ratione enim explicabo quo aut pariatur quia dolorem. Quis suscipit temporibus non vel velit ut."
          },
          {
            "id": "NDQyMzIxODA0MQ==",
            "text": "Quia voluptas nihil magni consequuntur veniam ipsa tempore quas cupiditate. Corrupti et eos inventore eveniet omnis quas minima. Ut et aut labore maxime est. Qui iure earum non.\n \rDoloremque molestias eius inventore laudantium dolorum. Dolor sed velit odio ut veniam tempore. Explicabo repudiandae officia.\n \rNon est et possimus quo eum. Sed dolorem est eum dolores non amet sit. Recusandae et reprehenderit. Eos dolores voluptatem dolorum voluptas. Dolores et tempora fuga a."
          }
        ],
        "submission": {
          "keywords": {
            "keywords": "extranet Buckinghamshire payment"
          },
          "title": {
            "text": "Et vitae dolores molestiae eos."
          },
          "abstract": {
            "text": "Qui similique molestiae fugit non suscipit culpa. Ducimus quo tempore vero. Eius qui sit autem veniam soluta eos aut. Quisquam fugit esse dolores at sunt.\n \rUt est magni adipisci cum reiciendis. Facilis quia ipsa exercitationem voluptatem dolor sed in et. Ut doloremque perferendis est pariatur veritatis qui amet. Deleniti non adipisci. Ab ipsa cumque est nostrum quia sint animi ipsa. Natus deserunt consequatur debitis eius qui quo autem facilis omnis.\n \rDolorem molestiae quae repellat reprehenderit sed. Rerum consectetur non est omnis. Animi iure dolore quia minus magnam at amet. Et suscipit quia vel odio aspernatur. Eligendi aut perferendis."
          },
          "doi": {
            "url": "10.24251/HICSS.2019.560"
          }
        }
      }]

      //Test green badge
      const testRendererGreen = TestRenderer.create(<AvatarCell reviews={reviewsGreen} />)
      //console.log(testRenderer.toJSON())
      expect(testRendererGreen.root.findByType(GreenBadge))
      expect(() => {
        testRendererGreen.root.findByType(RedBadge)
      }).toThrow()
    })

    it('Yellow when one review and review never answered', () => {
      const reviewsYellow = [{
        "id": "MzYyODc1MjU5NA==",
        "dateAssigned": "1566479462369",
        "dateCompleted": undefined,
        "dateDue": "1603740536999",
        "declined": 0,
        "quality": 1,
        "recommendation": 0,
        "reviewComments": [
          {
            "id": "NzY4Nzc1NjQzNw==",
            "text": "Quia ut atque quibusdam labore. Quia in reprehenderit dolor ut. Asperiores ea et sit nobis maxime quidem non. Error aut quia aliquid fugiat numquam vel et.\n \rId rem error at ut sunt illum et et quo. Eos tenetur et. Velit et voluptatibus qui sunt.\n \rMinus eligendi veritatis commodi error odio voluptatem omnis dignissimos. Pariatur numquam rerum nemo aut. Est et sit alias qui cupiditate aut enim."
          },
        ],
        "submission": {
          "keywords": {
            "keywords": "extranet Buckinghamshire payment"
          },
          "title": {
            "text": "Et vitae dolores molestiae eos."
          },
          "abstract": {
            "text": "Qui similique molestiae fugit non suscipit culpa. Ducimus quo tempore vero. Eius qui sit autem veniam soluta eos aut. Quisquam fugit esse dolores at sunt.\n \rUt est magni adipisci cum reiciendis. Facilis quia ipsa exercitationem voluptatem dolor sed in et. Ut doloremque perferendis est pariatur veritatis qui amet. Deleniti non adipisci. Ab ipsa cumque est nostrum quia sint animi ipsa. Natus deserunt consequatur debitis eius qui quo autem facilis omnis.\n \rDolorem molestiae quae repellat reprehenderit sed. Rerum consectetur non est omnis. Animi iure dolore quia minus magnam at amet. Et suscipit quia vel odio aspernatur. Eligendi aut perferendis."
          },
          "doi": {
            "url": "10.24251/HICSS.2019.560"
          }
        }
      }]

      //Test yellow badge
      const testRendererYellow = TestRenderer.create(<AvatarCell reviews={reviewsYellow} />)
      expect(testRendererYellow.root.findByType(YellowBadge))
      expect(() => {
        testRendererYellow.root.findByType(RedBadge)
      }).toThrow()
    })

    it('Red when three reviews and none of them answered', () => {
      const reviewsRed = [{
        "id": "MzYyODc1MjU5NA==",
        "dateAssigned": "1566479462369",
        "dateCompleted": undefined,
        "dateDue": "1603740536999",
        "declined": 0,
        "quality": 1,
        "recommendation": 0,
        "reviewComments": [
          {
            "id": "NzY4Nzc1NjQzNw==",
            "text": "Quia ut atque quibusdam labore. Quia in reprehenderit dolor ut. Asperiores ea et sit nobis maxime quidem non. Error aut quia aliquid fugiat numquam vel et.\n \rId rem error at ut sunt illum et et quo. Eos tenetur et. Velit et voluptatibus qui sunt.\n \rMinus eligendi veritatis commodi error odio voluptatem omnis dignissimos. Pariatur numquam rerum nemo aut. Est et sit alias qui cupiditate aut enim."
          },
        ],
        "submission": {
          "keywords": {
            "keywords": "extranet Buckinghamshire payment"
          },
          "title": {
            "text": "Et vitae dolores molestiae eos."
          },
          "abstract": {
            "text": "Qui similique molestiae fugit non suscipit culpa. Ducimus quo tempore vero. Eius qui sit autem veniam soluta eos aut. Quisquam fugit esse dolores at sunt.\n \rUt est magni adipisci cum reiciendis. Facilis quia ipsa exercitationem voluptatem dolor sed in et. Ut doloremque perferendis est pariatur veritatis qui amet. Deleniti non adipisci. Ab ipsa cumque est nostrum quia sint animi ipsa. Natus deserunt consequatur debitis eius qui quo autem facilis omnis.\n \rDolorem molestiae quae repellat reprehenderit sed. Rerum consectetur non est omnis. Animi iure dolore quia minus magnam at amet. Et suscipit quia vel odio aspernatur. Eligendi aut perferendis."
          },
          "doi": {
            "url": "10.24251/HICSS.2019.560"
          }
        }
      },
      {
        "id": "QzYyODc1MjU5NA==",
        "dateAssigned": "1566479462369",
        "dateCompleted": undefined,
        "dateDue": "1603740536999",
        "declined": 0,
        "quality": 1,
        "recommendation": 0,
        "reviewComments": [
          {
            "id": "NzY4Nzc1NjQzNw==",
            "text": "Quia ut atque quibusdam labore. Quia in reprehenderit dolor ut. Asperiores ea et sit nobis maxime quidem non. Error aut quia aliquid fugiat numquam vel et.\n \rId rem error at ut sunt illum et et quo. Eos tenetur et. Velit et voluptatibus qui sunt.\n \rMinus eligendi veritatis commodi error odio voluptatem omnis dignissimos. Pariatur numquam rerum nemo aut. Est et sit alias qui cupiditate aut enim."
          },
        ],
        "submission": {
          "keywords": {
            "keywords": "extranet Buckinghamshire payment"
          },
          "title": {
            "text": "Et vitae dolores molestiae eos."
          },
          "abstract": {
            "text": "Qui similique molestiae fugit non suscipit culpa. Ducimus quo tempore vero. Eius qui sit autem veniam soluta eos aut. Quisquam fugit esse dolores at sunt.\n \rUt est magni adipisci cum reiciendis. Facilis quia ipsa exercitationem voluptatem dolor sed in et. Ut doloremque perferendis est pariatur veritatis qui amet. Deleniti non adipisci. Ab ipsa cumque est nostrum quia sint animi ipsa. Natus deserunt consequatur debitis eius qui quo autem facilis omnis.\n \rDolorem molestiae quae repellat reprehenderit sed. Rerum consectetur non est omnis. Animi iure dolore quia minus magnam at amet. Et suscipit quia vel odio aspernatur. Eligendi aut perferendis."
          },
          "doi": {
            "url": "10.24251/HICSS.2019.560"
          }
        }
      },
      {
        "id": "QzYyODc1MjU5NA==",
        "dateAssigned": "1566479462369",
        "dateCompleted": undefined,
        "dateDue": "1603740536999",
        "declined": 0,
        "quality": 1,
        "recommendation": 0,
        "reviewComments": [
          {
            "id": "NzY4Nzc1NjQzNw==",
            "text": "Quia ut atque quibusdam labore. Quia in reprehenderit dolor ut. Asperiores ea et sit nobis maxime quidem non. Error aut quia aliquid fugiat numquam vel et.\n \rId rem error at ut sunt illum et et quo. Eos tenetur et. Velit et voluptatibus qui sunt.\n \rMinus eligendi veritatis commodi error odio voluptatem omnis dignissimos. Pariatur numquam rerum nemo aut. Est et sit alias qui cupiditate aut enim."
          },
        ],
        "submission": {
          "keywords": {
            "keywords": "extranet Buckinghamshire payment"
          },
          "title": {
            "text": "Et vitae dolores molestiae eos."
          },
          "abstract": {
            "text": "Qui similique molestiae fugit non suscipit culpa. Ducimus quo tempore vero. Eius qui sit autem veniam soluta eos aut. Quisquam fugit esse dolores at sunt.\n \rUt est magni adipisci cum reiciendis. Facilis quia ipsa exercitationem voluptatem dolor sed in et. Ut doloremque perferendis est pariatur veritatis qui amet. Deleniti non adipisci. Ab ipsa cumque est nostrum quia sint animi ipsa. Natus deserunt consequatur debitis eius qui quo autem facilis omnis.\n \rDolorem molestiae quae repellat reprehenderit sed. Rerum consectetur non est omnis. Animi iure dolore quia minus magnam at amet. Et suscipit quia vel odio aspernatur. Eligendi aut perferendis."
          },
          "doi": {
            "url": "10.24251/HICSS.2019.560"
          }
        }
      }]

      //Test red badge
      const testRendererRed = TestRenderer.create(<AvatarCell reviews={reviewsRed} />)
      expect(testRendererRed.root.findByType(RedBadge))
      expect(() => {
        testRendererRed.root.findByType(GreenBadge)
      }).toThrow()
    })

  })

})
