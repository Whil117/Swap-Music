const Greetings = () => {
  const hour = new Date().getHours()
  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour >= 12 || hour < 18
      ? 'Good Afternoon'
      : 'Good Evening'
  return greeting
}

export default Greetings
