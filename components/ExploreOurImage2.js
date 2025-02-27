// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function ExploreOurImage2({data}) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

 
//   const [title, setTitle] = useState(null);
//   const [content, setContent] = useState(null);
//   const [images  , setImages] = useState(null);
//   const [link, setLink] = useState(null)
//   const [buttonText, setButtonText] = useState(null);
//   //
// //   const [title2, setTitle2] = useState(null);
// //   const [content2, setContent2] = useState(null);
// //   const [images2  , setImages2] = useState(null);
// //   //
// //   const [title3, setTitle3] = useState(null);
// //   const [content3, setContent3] = useState(null);
// //   const [images3  , setImages3] = useState(null);
// // //
// // const [title4, setTitle4] = useState(null);
// //   const [content4, setContent4] = useState(null);
// //   const [images4  , setImages4] = useState(null);
// // //
// // const [title5, setTitle5] = useState(null);
// //   const [content5, setContent5] = useState(null);
// //   const [images5  , setImages5] = useState(null);


//   const sections = data?.Sections; // Safely access `Sections`  setTitle(getContent.Title?.[0]?.Title || null);

//   const getContent = Array.isArray(sections)
//     ? sections.find((sec) => sec.__component === "pages.explore-our-images2")
//     : null;

//     useEffect(() => {
//       if (getContent) {
        
//         setContent(getContent.Content || null);
//         setImages(getContent.Image ||null);
//         setTitle(getContent.Title || null);
//         setButtonText(getContent.Button)
//         setLink(getContent.Link)
//       }
//     }, [getContent]);


//   return (
//     <section class="camp-section custom-rtl">
//       <div className="container">
//         <div className="row">
//           {/* First Hover Section */}
//           <div className="col-md-4 aos" data-aos="fade-up">
//             <div className="hover-wrapper">
//               <div className="hover-main">
//                 <img
//                   src="/assets/img/hover-1.jpg"
//                   alt="Explore our Image 1"
//                   className="img-fluid"
//                 />
//                 <div className="hover-blk custom-right-align">
//                   <h4>{title}</h4>
//                   <p>{content}</p>
//                   <Link href="/bookanevent" passHref>
//                     <button className="btn btn-primary mt-auto">
//                      {buttonText}
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Second Hover Section */}
//           <div className="col-md-4 aos" data-aos="fade-up">
//             <div className="hover-wrapper">
//               <div className="hover-main">
//                 <img
//                   src="/assets/img/hover-6.jpg"
//                   alt="Explore our Image 2"
//                   className="img-fluid"
//                 />
//                 <div className="hover-blk custom-right-align">
//                   <h4>Explore our Image 2 Title</h4>
//                   <p>Explore our Image 2 Description</p>
//                   <Link href="/bookanevent" passHref>
//                     <button className="btn btn-primary mt-auto">
//                       Book Now
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Third Hover Section */}
//           <div className="col-md-4 aos" data-aos="fade-up">
//             <div className="hover-wrapper">
//               <div className="hover-main">
//                 <img
//                   src="/assets/img/hover-3.png"
//                   alt="Explore our Image 3"
//                   className="img-fluid"
//                 />
//                 <div className="hover-blk custom-right-align">
//                   <h4>Explore our Image 3 Title</h4>
//                   <p>Explore our Image 3 Description</p>
//                   <Link href="/bookanevent" passHref>
//                     <button className="btn btn-primary mt-auto">
//                       Book Now
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//           {/* Fourth Hover Section */}
//         <div className="row justify-content-center">
//           <div className="col-md-4 aos" data-aos="fade-up">
//             <div className="hover-wrapper">
//               <div className="hover-main">
//                 <img
//                   src="/assets/img/hover-4.jpg"
//                   alt="Explore our Image 4"
//                   className="img-fluid"
//                 />
//                 <div className="hover-blk custom-right-align">
//                   <h4>Explore our Image 4 Title</h4>
//                   <p>Explore our Image 4 Description</p>
//                   <Link href="/bookanevent" passHref>
//                     <button className="btn btn-primary mt-auto">
//                       Book Now
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Fifth Hover Section */}
//           <div className="col-md-4 aos" data-aos="fade-up">
//             <div className="hover-wrapper">
//               <div className="hover-main">
//                 <img
//                   src="/assets/img/treasure-hunting.png"
//                   alt="Explore our Image 5"
//                   className="img-fluid"
//                 />
//                 <div className="hover-blk custom-right-align">
//                   <h4>Explore our Image 5 Title</h4>
//                   <p>Explore our Image 5 Description</p>
//                   <Link href="/bookanevent" passHref>
//                     <button className="btn btn-primary mt-auto">
//                       Book Now
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="camp-btn aos" data-aos="fade-up">
//           <Link href="/experiences" className="btn btn-primary">
//             View All Experiences
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
