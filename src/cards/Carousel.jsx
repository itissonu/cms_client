import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { url } from '../utils/BackEndUrl';
import { LuArrowUpRightFromCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';




const Carouselcomponent = () => {
    const navigate = useNavigate()
    const [blogs, setBlogData] = useState([])
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const responsedata = await axios.get(`${url}/api/blog/blogs`);
                if (responsedata) {
                    setBlogData(responsedata.data);
                } else {
                    throw new Error('Failed to fetch blog data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogData();

    }, []);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    return (
        <div>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={1000}
                slidesToSlide={10}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}

                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {blogs?.length !== 0 && blogs?.map((blog, indx) => (
                    <div onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/myblogs/${blog?._id}`)
                    }} key={indx} className='hover:cursor-pointer flex-shrink-0 w-[100%]  h-[250px] p-2 m-1  rounded-md  border-[1px] '
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <div className='w-[100%] h-[100%] group/item relative justify-center items-center'>

                            <span className='z-5 invisible group-hover/item:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-400 rounded-full p-1'>
                                <LuArrowUpRightFromCircle className='h-8 w-8 text-sky-100' />
                            </span>
                            <img src={blog.CoverPhoto} className='h-[100%] w-[100%] object-cover rounded-xl hover:opacity-25' />

                            <span className='absolute bottom-0 left-0 right-0 p-2  bg-opacity-50 font-bold text-white text-center text-xs  line-clamp-2 truncate max-w-96  group-hover/item:h-14 '>
                                {blog?.title}
                            </span>
                        </div>

                    </div>

                )

                )}
            </Carousel>;
        </div>
    )
}

export default Carouselcomponent