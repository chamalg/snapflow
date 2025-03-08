//Function to highlight hashtags in the description
export const renderDescription = (text) => {  
    return text.split(/(#[\w]+)/g).map((part, index) =>
      part.startsWith("#") ? (
        <span
          key={index}
          style={{ color: "dodgerblue", fontWeight: "bold", cursor: "pointer" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  