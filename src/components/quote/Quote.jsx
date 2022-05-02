const Quote = ({quote, loaded}) => {
  return (
    <div className="quote-block">
      <cite className="quote-text">{quote.text}</cite>
      <span className="quote-author">{
        !loaded 
        ? ""
        : quote.author !== null
          ? quote.author
          : "Anonymous"}
        </span>
    </div>
  )
}

export default Quote;