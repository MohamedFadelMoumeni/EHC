
import Slider from 'react-infinite-logo-slider'
import styles from '../../style';

const InfiniteLogoSlider = () => {
    
    return (
        <section id="references">
        <h2 className={styles.heading2 +" text-center mb-2"}>
        NOS RÉFÉRENCES 
        </h2>
        <p className={styles.paragraph +" text-center mb-5"}> Nous sommes fiers de collaborer avec des partenaires et clients prestigieux à travers divers secteurs. 
            Découvrez quelques-unes des organisations qui nous font confiance.</p>
        <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
        >
            <Slider.Slide>
                <img src="/assets/references/1.png" alt="any" className='w-36' />
            </Slider.Slide>
            <Slider.Slide>
                <img src="/assets/references/2.png" alt="any2" className='w-36' />
            </Slider.Slide>
            <Slider.Slide>
                <img src="/assets/references/3.png" alt="any3" className='w-36' />
            </Slider.Slide>
            <Slider.Slide>
            <img src="/assets/references/4.png" alt="any3" className='w-36' />
            </Slider.Slide>
            <Slider.Slide>
            <img src="/assets/references/5.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/6.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/7.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/8.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/9.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/10.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/11.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/12.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/13.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/14.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/15.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/16.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/17.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/18.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/19.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/20.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/21.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/22.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/23.png" alt="any3" className='w-36' />
            </Slider.Slide><Slider.Slide>
            <img src="/assets/references/24.png" alt="any3" className='w-36' />
            </Slider.Slide>
            <Slider.Slide>
            <img src="/assets/references/25.png" alt="any3" className='w-36' />
            </Slider.Slide>
            
        </Slider>
        </section>
    )
}              
                     

export default InfiniteLogoSlider;
