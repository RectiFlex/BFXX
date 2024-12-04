type PageHeaderProps = {
  title: string
  description: string
  action?: React.ReactNode
}

function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
      {action}
    </div>
  )
}

export default PageHeader