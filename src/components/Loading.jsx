import { LineWobble } from "@uiball/loaders"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LineWobble size={80} speed={2} color="white" lineWeight={6} />
    </div>
  )
}

export default Loading