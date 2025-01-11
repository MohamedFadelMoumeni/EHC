import { useState } from 'react'
import MessageForm from './forms/MessageForm'
import QuoteForm from './forms/QuoteForm'

function EvCallToAction() {
  const [activeForm, setActiveForm] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budget: '',
    description: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceType: '',
      budget: '',
      description: '',
      message: ''
    })
    setActiveForm(null)
  }

  return (
    <section id="contact_events" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              className={`btn-primary ${activeForm === 'message' ? 'bg-primary-dark' : ''}`}
              onClick={() => setActiveForm('message')}
            >
              Envoyer un message
            </button>
            <button 
              className={`btn-secondary ${activeForm === 'quote' ? 'bg-primary text-white' : ''}`}
              onClick={() => setActiveForm('quote')}
            >
              Demander un devis
            </button>
          </div>

          {activeForm === 'message' && (
            <MessageForm/>
          )}

          {activeForm === 'quote' && (
            <QuoteForm/>
          )}
        </div>
      </div>
    </section>
  )
}

export default EvCallToAction