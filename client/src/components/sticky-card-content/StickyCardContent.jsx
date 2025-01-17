import React, { useEffect, useState } from 'react';
import styles from './StickyCardContent.module.css';
import ThisCourseIncludes from '../this-course-includes/ThisCourseIncludes';
import { checkout } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';


function StickyCardContent({ details, additionalDetails }) {
    const navigate = useNavigate();
    // const {image_750x422: image} = details;

    // get image from data
    const { image, price, id, title } = details;
    console.log(details)

    const [hidden, toggleHidden] = useState(false);

    const handleStyles = () => {
        if (window.scrollY > 400) {
            toggleHidden(true);
        } else {
            toggleHidden(false);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', handleStyles);
    }, []);

    const handleBuy = async () => {
        console.log(price, 1, id, title, +localStorage.getItem("id"))

        const data = {
            amount: price,
            quantity: 1,
            productId: id,
            name: title,
            userId: +localStorage.getItem("id")
        }

        const res = await checkout(data)
        if (res.data.sessionUrl) {
            window.open(res.data.sessionUrl, "_blank")
        }
    }

    return (
        <main
            className={styles.mainContainer}
            style={{
                position: 'absolute',
                marginTop: hidden ? '1rem' : '0',
                boxShadow: hidden ? '0 10px 10px #c2c9d6' : 'none'
            }}
        >
            <figure className={hidden ? styles.hide : styles.imageWrapper}>
                <img
                    className='d-block w-100'
                    src={image}
                    alt=''
                />
            </figure>
            <div className={styles.cardBody}>
                <p className={styles.price}>E£679.99</p>
                {/* <button
                    className={[styles.addToCartButton, styles.button].join(
                        ' '
                    )}
                >
                    Add to cart
                </button> */}
                <button
                    onClick={handleBuy}
                    className={[styles.buyNowButton, styles.button].join(' ')}
                >
                    Buy now
                </button>
                <p className='text-center'>30 Day Money Back Guarantee</p>
                <ThisCourseIncludes details={additionalDetails} />
                <section className={styles.buttonsWrapper}>
                    <button className={styles.footerButton}>Share</button>
                    <button className={styles.footerButton}>
                        Gift this course
                    </button>
                    <button className={styles.footerButton}>
                        Apply coupon
                    </button>
                </section>
                <section className={styles.training}>
                    <p className={styles.trainingSectionTitle}>
                        Training 5 or more people?
                    </p>
                    <p className={styles.trainingSectionText}>
                        Get your team access to 17,000+ top Udemy courses
                        anytime, anywhere.
                    </p>
                    <button className={styles.tryUdemyBusinessButton}>
                        Try Udemy Business
                    </button>
                </section>
            </div>
        </main>
    );
}

export default StickyCardContent;
