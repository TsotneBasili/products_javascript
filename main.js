

//fetch function
const starSOlid = `<i class="fa-solid fa-star"></i>`;
const starNormal = `<i class="fa-regular fa-star"></i>`;
const next = document.querySelector('#nextButton')
const previous = document.querySelector('#previousButton')
const buttonSection = document.querySelector('#buttonSection')
const prevButtonSection = document.querySelector('#prevButtonSection')
const pageCount = document.querySelector('#pageCount')


function createProduct(dataPassed, page, productPerPage, div, api='default') {
    dataPassed.products.forEach(product => {
        const productDiv = document.createElement('div');
        const rating = Math.round(product.rating)
        const stars = starSOlid.repeat(rating) + starNormal.repeat(5 - rating)
        productDiv.innerHTML = (`
            <article class="catalog_sec_sec2_article">
                <img class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                <span class="catalog_sec_sec2_article_span">
                    <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                    <div class="text-warning">
                        ${stars}
                    </div>
                    <i class="fa-sharp fa-solid fa-cart-plus section3_cart"></i>
                </span> 
            </article>
        `);

        productDiv.addEventListener('click', () => {
            if(div === productsDivCatalog) {
            buttonSection.style.display = "none"
            }
            fetch(`https://dummyjson.com/products/${product.id}`)
                .then(response => response.json())
                .then((product) => {
                    // console.log(product)
                    const backButton = document.createElement('button')
                    backButton.textContent = 'Go Back'
                    backButton.classList.add('.buttons')
                    backButton.style.cursor = 'pointer'
                    backButton.addEventListener("click", () => {
                        if(div === productsDivCatalog) {
                            buttonSection.style.display = "flex"
                            }
                        div.removeChild(backButton);
                        div.innerHTML = ('')
                        fetchFunction(page, productPerPage, div, api)
                    })

                    div.innerHTML = (`
                        <article class="catalog_sec_sec2_article">
                            <img id="imagePost" class="catalog_sec_sec2_article_image" src="${product.thumbnail}">
                            <p class="catalog_sec_sec2_article_p">${product.title}</p> 
                            <span class="catalog_sec_sec2_article_span">
                                <p class="catalog_sec_sec2_article_span_p">${product.price} $</p>
                                <div class="text-warning">
                                    ${stars}
                                </div>
                                <i class="fa-sharp fa-solid fa-cart-plus section3_cart"></i>
                            </span> 
                        </article>
                    `); 
                    div.appendChild(backButton);
                })
        })
        

        div.appendChild(productDiv)
    })
}

function fetchFunction(page, productPerPage, div, api='default') {
    
    function random (){
        fetch(`https://dummyjson.com/products?limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(Response => Response.json())
            .then(data => {
                function one() {
                    createProduct(data, page, productPerPage, div)                    
                }

                ///function two
                function two() {
                    // buttonSection.style.display = "flex"

                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.textContent = `Page ${page + 1} of ${totalPages}`;

                    createProduct(data, page, productPerPage, div)

                    //next-prev buttons
                    //previous
                    if (page != 0) {
                        prevButtonSection.appendChild(previous)

                    } else if (page === 0) {
                        prevButtonSection.removeChild(previous)

                    }

                    function handlePreviousClick() {
                        page -= 1;
                        prevButtonSection.removeChild(previous);
                        pageCount.textContent = `Page ${page + 1} of ${totalPages}`;
                        div.innerHTML = ``;
                        fetchFunction(page, productPerPage, div);
                    }

                    previous.addEventListener('click', handlePreviousClick);
                    //previous

                    //next
                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(next)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1) {
                        buttonSection.appendChild(next)
                    }

                    function handleNextClick() {
                        page += 1;
                        buttonSection.removeChild(next);
                        pageCount.textContent = `Page ${page + 1} of ${totalPages}`;
                        div.innerHTML = ``;
                        fetchFunction(page, productPerPage, div);
                    }

                    next.addEventListener('click', handleNextClick);
                    //nextprev buttons


                    
                    //sorting
                    //popular
                    let sortEventCount = 0
                    function sortByPopularEventListener() {
                        sortEventCount += 1
                        if (sortEventCount > 1) {
                            sortOptionAsc.removeEventListener('click', sortOptionAscEventListener);
                            sortOptionAsc.addEventListener('click', sortOptionAscEventListener);
                         }
 
                        window.location.href = './catalog.html'
        
                    };
                    sortByPopular.addEventListener('click', sortByPopularEventListener)

                    //asc
                    let ascCOunt = 0
                    function sortOptionAscEventListener() {
                        sortOptionAsc.removeEventListener('click', sortOptionAscEventListener)

                        ascCOunt +=1
                        // if (ascCOunt > 1){
                        //    sortOptionAsc.removeEventListener('click', sortOptionAscEventListener)
                        //    sortOptionAsc.addEventListener('click', sortOptionAscEventListener)
                        // }

                        arrowDown.style.transform = 'rotate(0deg)';     
                        
                        catalogSecButton2.removeChild(sortOptionDesc);
                        catalogSecButton2.removeChild(sortByPopular);
                        page = 0
                        // buttonSection.removeChild(next);
                        next.removeEventListener('click', handleNextClick);

                        // prevButtonSection.removeChild(previous);
                        previous.removeEventListener('click', handlePreviousClick);
                        
                        fetchFunction(page, productPerPageCatalogAsc, productsDivCatalog, 'asc')

                        
                        next.addEventListener('click', () => {
                            page += 1
                            buttonSection.removeChild(next)
                            pageCount.textContent = `Page ${page} of ${totalPages}`;
                            div.innerHTML = (`
                            `);
    
                            fetchFunction(page, productPerPageCatalogAsc, productsDivCatalog, 'asc')
                        })

                    
                        previous.addEventListener('click', () => {
                            page -= 1
                            prevButtonSection.removeChild(previous)
                            pageCount.textContent = `Page ${page} of ${totalPages}`;
                            div.innerHTML = (`
                                `);
                            fetchFunction(page, productPerPageCatalogAsc, productsDivCatalog, 'asc')
    
                        })
                        
                        sortOptionAsc.addEventListener('click', sortOptionAscEventListener)

                    }
                    sortOptionAsc.addEventListener('click', sortOptionAscEventListener)

                    //desk
                    let descCOunt = 0;
                    function sortOptionDescEventListener() {
                        descCOunt += 1
                        sortOptionDesc.removeEventListener('click', sortOptionDescEventListener)

                        // if (ascCOunt > 1){
                        //     sortOptionDesc.removeEventListener('click', sortOptionDescEventListener)
                        //     sortOptionDesc.addEventListener('click', sortOptionDescEventListener)
                        //  }


                        arrowDown.style.transform = 'rotate(0deg)';     

                        catalogSecButton2.removeChild(sortOptionAsc);
                        catalogSecButton2.removeChild(sortByPopular);

                        page = 0
                        // buttonSection.removeChild(next);
                        next.removeEventListener('click', handleNextClick);

                        // prevButtonSection.removeChild(previous);
                        previous.removeEventListener('click', handlePreviousClick);
                        
                        fetchFunction(page, productPerPageCatalogDesc, productsDivCatalog, 'desc')

                        
                        next.addEventListener('click', () => {
                            page += 1
                            buttonSection.removeChild(next)
                            pageCount.textContent = `Page ${page} of ${totalPages}`;
                            div.innerHTML = (`
                            `);
    
                            fetchFunction(page, productPerPageCatalogDesc, productsDivCatalog, 'desc')
                        })

                    
                        previous.addEventListener('click', () => {
                            page -= 1
                            prevButtonSection.removeChild(previous)
                            pageCount.textContent = `Page ${page} of ${totalPages}`;
                            div.innerHTML = (`
                                `);
                            fetchFunction(page, productPerPageCatalogDesc, productsDivCatalog, 'desc')
    
                        })
                        sortOptionDesc.addEventListener('click', sortOptionDescEventListener)


                    }
                    sortOptionDesc.addEventListener('click', sortOptionDescEventListener)
                    

                }

                if (div === productsDivHome) {
                    one()
                } else if (div === productsDivCatalog) {
                    two()
                } 

            })
    }


    function fetchFunctionasc(){
        
        div.innerHTML = ''

        fetch(`https://dummyjson.com/products?sortBy=title&order=asc&limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(res => res.json())
            .then(data => {
                
                
                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.textContent = `Page ${page + 1} of ${totalPages}`;

                    createProduct(data, page, productPerPage, div, api)

                    if (page != 0) {
                        prevButtonSection.appendChild(previous)

                    } else if (page === 0 ) {
                        prevButtonSection.removeChild(previous)

                    }

                    previous.addEventListener('click', () => {
                        page -= 1
                        prevButtonSection.removeChild(previous)
                        pageCount.textContent = `Page ${page} of ${totalPages}`;
                        div.innerHTML = (`
                            `);
                        fetchFunction(page, productPerPage, div, 'asc')

                    })

                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(next)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1) {
                        buttonSection.appendChild(next)
                    }
                    next.addEventListener('click', () => {
                        page += 1
                        buttonSection.removeChild(next)
                        pageCount.textContent = `Page ${page} of ${totalPages}`;
                        div.innerHTML = (`
                        `);

                        fetchFunction(page, productPerPage, div, 'asc')
                    })
                    
                

            })
    } 

    function fetchFunctiondesc(){
        div.innerHTML = ''

        fetch(`https://dummyjson.com/products?sortBy=title&order=desc&limit=${productPerPage}&skip=${page * productPerPage}`)
            .then(res => res.json())
            .then(data => {
                
                
                    const totalPages = Math.ceil(data.total / productPerPage)
                    pageCount.textContent = `Page ${page + 1} of ${totalPages}`;

                    createProduct(data, page, productPerPage, div, api)

                    if (page != 0) {
                        prevButtonSection.appendChild(previous)

                    } else if (page === 0 ) {
                        prevButtonSection.removeChild(previous)

                    }

                    previous.addEventListener('click', () => {
                        page -= 1
                        prevButtonSection.removeChild(previous)
                        pageCount.textContent = `Page ${page} of ${totalPages}`;
                        div.innerHTML = (`
                            `);
                        fetchFunction(page, productPerPageCatalogAsc, productsDivCatalog, 'desc')

                    })

                    if (page === Math.ceil(data.total / productPerPage)) {
                        buttonSection.removeChild(next)
                    } else if (page < Math.ceil(data.total / productPerPage) - 1) {
                        buttonSection.appendChild(next)
                    }
                    next.addEventListener('click', () => {
                        page += 1
                        buttonSection.removeChild(next)
                        pageCount.textContent = `Page ${page} of ${totalPages}`;
                        div.innerHTML = (`
                        `);

                        fetchFunction(page, productPerPage, div, 'desc')
                    })
                    
                

            })
    }

    if (div === productsDivHome) {
        random()
    } else if (div === productsDivCatalog && api === 'default') {
        random()
    } else if(div === productsDivCatalog && api === 'asc'){
        fetchFunctionasc()
    }  else if(div === productsDivCatalog && api === 'desc'){
        fetchFunctiondesc()
    } 
}


///homepage
const productsDivHome = document.querySelector('#homeCatalog')
let homeCurrentPage = 0
let homePerPageCatalog = 4;

fetchFunction(homeCurrentPage, homePerPageCatalog, productsDivHome)


//catalog
const productsDivCatalog = document.querySelector('.catalog_sec_sec2')
const catalogCurrentPage = 0;
const productPerPageCatalog = 4;

fetchFunction(catalogCurrentPage, productPerPageCatalog, productsDivCatalog)

//catalog asc
let currentPageAsc = 0;
const productPerPageCatalogAsc = 3;


//catalog desc
let currentPageDesc = 0;

const productPerPageCatalogDesc = 5


///sorting
const catalogSecButton2 = document.querySelector('.catalog_sec_button2');
const arrowDown = document.querySelector('#arrowDown');
const sortByPopular = document.querySelector('#sortByPopular')
const sortOptionAsc = document.createElement('span')
const sortOptionDesc = document.createElement('span')
sortOptionAsc.textContent = (`
    Sort By asc
`)
sortOptionDesc.textContent = (`
    Sort By desc
`)
sortOptionAsc.classList.add('catalog_span')
sortOptionDesc.classList.add('catalog_span')







//sorting
//catalog eventlistener
let clickCount = 0;

function handleCatalogClick() {
    page = 0
    clickCount += 1
    if (clickCount > 1){
        catalogSecButton2.removeEventListener('click', handleCatalogClick)
        catalogSecButton2.addEventListener('click', handleCatalogClick)
     }


    if (clickCount % 2 === 1){
        catalogSecButton2.appendChild(sortByPopular);
        catalogSecButton2.appendChild(sortOptionAsc);
        catalogSecButton2.appendChild(sortOptionDesc);

        catalogSecButton2.removeChild(arrowDown);
        catalogSecButton2.appendChild(arrowDown);
        arrowDown.style.transform = 'rotate(180deg)';
    } else {
        catalogSecButton2.removeChild(sortByPopular);
        catalogSecButton2.removeChild(sortOptionAsc);
        catalogSecButton2.removeChild(sortOptionDesc);  
        arrowDown.style.transform = 'rotate(0deg)';     
    }

    // Remove the event listener after it's executed
    // catalogSecButton2.removeEventListener('click', handleCatalogClick);
}

catalogSecButton2.addEventListener('click', handleCatalogClick);
