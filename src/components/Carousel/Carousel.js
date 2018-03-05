import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'
import './Carousel.css'

export default class ReactSlickDemo extends React.Component {
  render() {
    var settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      variableWidth: true,
      initialSlide: 1,
      // responsive:[ 
      //   { breakpoint: 375, settings: { slidesToShow: 1 } },
      //   { breakpoint: 1024, settings: { slidesToShow: 1 } },
      //   { breakpoint: 100000, settings: 'unslick' } 
      // ]
    };

    return (
      <div className='container'>
        <Slider {...settings}>
          {/* <div><div className='overLay'>hello look at me you jerk<img height='450px' width='700px'src='http://static.food2fork.com/PumpkinFrenchToast1d115.jpg' /></div></div> */}
          {/* <div><img height='450px' width='700px'src='http://static.food2fork.com/31178_slow_cooker_pork_ramen_30004d87.jpg' /></div> */}
          <div style={{ backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage: `url(http://static.food2fork.com/2749087215_17cd75a8cdf83a.jpg)` }} >
            <div className='pics1'>
              <div className='other'>
                Welcome to Yummers
              </div>
            </div>
          </div>
          <div style={{ backgroundSize: 'cover', backgroundImage: `url(http://static.food2fork.com/31178_slow_cooker_pork_ramen_30004d87.jpg)` }} >
            
            <div className='pics'>
              <div className='other'>
                Yummers is a great way to search 1000's of recipes. 
              <a href={'https://www.freepik.com/'} target="_blank"></a>
              </div>
            </div>
          </div>
          <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(http://static.food2fork.com/PumpkinFrenchToast1d115.jpg)` }} >
            <div className='pics'>
              <div className='other'>
               Cool french toast recipes.
              </div>
            </div>
          </div>
          <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(http://static.food2fork.com/604133_mediumd392.jpg)` }} >
            <div className='pics'>
              <div className='other1'>
                Tons of fun desserts and ideas!
              </div>
            </div>
          </div>
          <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(http://static.food2fork.com/SweetPotatoKaleGrilledCheese55a59.jpg)` }} >
            <div className='pics'>
              <div className='other2'>
              Sandwiches! Yum!!
              </div>
            </div>
          </div>
          
          {/* <div><img  height='450px' width='700px'src='http://static.food2fork.com/2749087215_17cd75a8cdf83a.jpg' /></div>
          <div><img  height='450px' width='700px'src='http://static.food2fork.com/604133_mediumd392.jpg' /></div>
        <div><img  height='450px' width='700px'src='http://static.food2fork.com/SweetPotatoKaleGrilledCheese55a59.jpg' /></div> */}

        </Slider>
      </div>
    );
  }
}