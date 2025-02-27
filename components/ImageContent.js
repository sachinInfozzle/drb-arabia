import React from "react";
import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function AdvanceGallery({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    Content: contents,
    Image,
    Button,
    Description: description,
    Position: position,
  } = getContent;

  const image = Image?.[0]?.formats?.small?.url || Image?.url;

  // Process content through RichText
  const content = RichText(contents);

  return (
    <div className="exp-section image-content" style={{ order: position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              <FadeUpWrapper>
                <h2>{title}</h2>
              </FadeUpWrapper>
              <FadeUpWrapper>
                {description && (
                  <h6 className="custom-hfont2 text-color-change">{description}</h6>
                )}
              </FadeUpWrapper>
            </div>
          </div>
        </div>
        <div className="row align-items-center custom-row-reverse">
          {/* Image Section */}
          <div className="col-md-6 aos" data-aos="fade-up">
            <FadeUpWrapper>
              <img
                src={image ? `${apiUrl}${image}` : ""}
                className="img-fluid"
                alt="Experiences"
              />
            </FadeUpWrapper>
          </div>

          {/* Content Section */}
          <div className="col-md-6 aos" data-aos="fade-up">
            <FadeUpWrapper>
              <div className="content-info camp-content custom-right-align">
                {title && <h2>{title}</h2>}
                {content}
              </div>
            </FadeUpWrapper>
          </div>
        </div>
        <FadeUpWrapper>
          <div className="private-btn custom-right-align custom-mt60">
            {Button && (
              <a href={Button.Link} className="btn btn-primary">
                {Button.Title}
              </a>
            )}
          </div>
        </FadeUpWrapper>
      </div>
    </div>
  );
}

// import React from "react";
// import { RichText, SectionData } from "@/utils/helper";
// import { FadeUpWrapper } from "@/utils/FadeAnimation";

// export default function AdvanceGallery({ data }) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const sec_name = "pages.image-content";
//   const getContent = SectionData(data, sec_name);

//   // Early return if no content
//   if (!getContent) return null;

//   const {
//     Title: title,
//     Content: contents,
//     Image,
//     Button,
//     Description: description,
//     Position: position,
//   } = getContent;

//   const image = Image?.[0]?.formats?.small?.url || Image?.url;

//   // Process content through RichText
//   const content = RichText(contents);

//   return (
//     <div className="exp-section image-content" style={{ order: position }}>
//       <div className="container">
//         <div className="row">
//             <div className="col-md-12 aos" data-aos="fade-up">
//               <div className="section-header">
//                 <FadeUpWrapper>
//                 {title &&
//                   <h2>{title}</h2>}
//                 {description && (
//                   <h6 className="custom-hfont2">{description}</h6>
//                 )}
//                 </FadeUpWrapper>
//               </div>
//             </div>
//         </div>
//         <div className="row align-items-center custom-row-reverse">
//           {/* Image Section */}
//           <div className="col-md-6 aos" data-aos="fade-up">
//           <FadeUpWrapper>
//             <img
//               src={image ? `${apiUrl}${image}` : ""}
//               className="img-fluid"
//               alt="Experiences"
//             />
//             </FadeUpWrapper>
//           </div>

//           {/* Content Section */}
//           <div className="col-md-6 aos" data-aos="fade-up">
//           <FadeUpWrapper>
//             <div className="content-info camp-content custom-right-align">
//
//               {content}
//             </div>
//             </FadeUpWrapper>
//           </div>
//         </div>
//         <FadeUpWrapper>
//         <div className="private-btn custom-right-align custom-mt60">
//           {Button && (
//             <a href={Button.Link} className="btn btn-primary">
//               {Button.Title}
//             </a>
//           )}
//         </div>
//         </FadeUpWrapper>
//       </div>
//     </div>
//   );
// }
