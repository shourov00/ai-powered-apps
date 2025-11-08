import ReviewList from '@/components/reviews/ReviewList.tsx'

function App() {
  return (
    <div className={'p-6 h-screen container mx-auto'}>
      {/*<ChatBot />*/}
      <ReviewList productId={1} />
    </div>
  )
}

export default App
