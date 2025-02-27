import React from "react";

export const SectionData = (data, sec_name) => {
  const sections = data?.Sections;

  // Ensure sections exist and find the one matching the provided sec_name
  return Array.isArray(sections)
    ? sections.find((section) => section.__component === sec_name)
    : null;
};

export const RichText = (content) => {
  return content.map((item, index) => {
    if (item.type === "paragraph") {
      // Process paragraphs and wrap bold text in <strong>
      const paragraphContent = item.children.map((child, childIndex) => {
        if (child.bold) {
          return (
            <strong className="rich-bold" key={childIndex}>
              {child.text}
            </strong>
          );
        } else if (child.type == "link") {
          return (
            <a class="in-btn btn btn-primary" href={child.url}>
              {child.children[0].text}
            </a>
          );
        } else if (child.type == "text") {
          if (child.text == "") {
            return (
              <>
                <br />
              </>
            );
          } else {
            return child.text;
          }
        } else {
          return child.text;
        }
      });

      return <p key={index}>{paragraphContent}</p>;
    }

    if (item.type === "heading") {
      // For headings, use the correct heading level (h1, h2, h3, etc.)
      const headingTag = `h${item.level}`;
      const headingContent = item.children
        .map((child, childIndex) => child.text)
        .join("");
      return React.createElement(headingTag, { key: index }, headingContent);
    }

    if (item.type === "list") {
      // For lists (ordered or unordered)
      const listTag = item.format === "ordered" ? "ol" : "ul";
      const listItems = item.children.map((listItem, listIndex) => {
        const listItemContent = listItem.children
          .map((child, childIndex) => child.text)
          .join("");
        return <li key={listIndex}>{listItemContent}</li>;
      });

      return React.createElement(listTag, { key: index }, listItems);
    }

    return null;
  });
};
