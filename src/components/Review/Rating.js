
const RATINGS = [1, 2, 3, 4, 5];

const ratingCSS = `
.Rating-star {
    color: slategray;
}

.Rating-star.selected {
    color: rgb(249, 14, 242);
}
`;

const style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(ratingCSS));
document.head.appendChild(style);

function Star({ selected = false, rating = 0, onSelect, onHover }) {
    const className = `Rating-star ${selected ? 'selected' : ''}`;   //false=Rating-star , True = Rating-star.seleted
    const handleClick = onSelect ? () => onSelect(rating) : undefined;
    const handleMouseOver = onHover ? () => onHover(rating) : undefined;

    return (
        <span
            className={className}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
        >
            ✦
        </span>
    );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
    return (
        <div className={className} onMouseOut={onMouseOut}>
            {RATINGS.map((rating) => (
                <Star
                    key={rating}
                    selected={value >= rating}
                    rating={rating}
                    onSelect={onSelect}
                    onHover={onHover}
                />
            ))}
        </div>
    );
}

export default Rating;