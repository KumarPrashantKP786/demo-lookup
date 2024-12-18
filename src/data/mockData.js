export const products = [
    {
      id: 1,
      title: 'Casual Shirt',
      description: 'A comfortable casual shirt.',
      price: 29.99,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
      id: 2,
      title: 'Sneakers',
      description: 'Stylish sneakers for everyday use.',
      price: 59.99,
      image: 'https://fakestoreapi.com/img/51aP6j9V0eL._AC_SY679_.jpg',
    },
    {
      id: 3,
      title: 'Jeans',
      description: 'Slim fit jeans for a sleek look.',
      price: 39.99,
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    },
  ];
  
  export const looks = [
    {
      id: 1,
      images: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'],
      products: [products[0], products[1]],
    },
    {
      id: 2,
      images: ['https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'],
      products: [products[2]],
    },
  ];
  