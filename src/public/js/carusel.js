new Glide(".images",{
    type:'carousel',
    perView:6,
    breakpoints:{
        1200:{
            perView:3
        },
        600:{
            perView:1
        }
    }
}).mount();