const data = {
  merchantCoupons: {
    10: {
      name: 'Thirdwave Coffee',
      logoUrl:
        'https://cdn.shopify.com/s/files/1/1834/9395/files/TWLOGO_x100@2x.png?v=1620894734',
      coupons: [
        {
          couponId: 'qweweqwe',
          status: 'active',
          code: 'TWX-DZ3-B5A-3',
          location: {
            name: 'HSR Layout',
            locationId: '22',
            phone: '9886741382',
            whatsapp: '+919886741382',
          },
          offer: {
            text: '10% off on orders of Rs 300 or above',
            conditions: 'max Rs 50, min order: Rs 300',
            validity: {
              from: '1-Jul-21',
              to: '14-Aug-21',
            },
          },
          online: {
            url: 'https://www.thirdwavecoffeeroasters.com/collections/cold-brew/products/signature-cold-brew-blend?code=',
          },
        },
        {
          couponId: 'thrdwave2',
          status: 'active',
          code: 'TWC-1XA-093-B',
          location: {
            name: 'All locations',
            locationId: '21',
            phone: '9886741382',
            whatsapp: '+919886741382',
          },
          offer: {
            text: '10% off before noon',
            conditions: null,
            validity: {
              from: '3-Jul-21',
              to: '15-Jul-21',
            },
          },
          online: {
            url: 'https://www.thirdwavecoffeeroasters.com/collections/cold-brew/products/signature-cold-brew-blend?code=',
          },
        },
        {
          couponId: 'thrdwave3',
          status: 'expired',
          code: 'TWC-1XA-093-B',
          location: {
            name: 'Indiranagar',
            locationId: '21',
            phone: '+917022268102',
            whatsapp: '+917022268102',
          },
          offer: {
            text: '1 Free coffee',
            conditions: 'min order: Rs 100',
            validity: {
              from: '14-May-21',
              to: '14-Jun-21',
            },
          },
        },
      ],
    },
  },
};

export default data;
