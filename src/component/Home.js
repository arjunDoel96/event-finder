import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Home = () => {
  const [getEvents, setEvents] = useState([])
  const [modalID, setModalID] = useState('')
  const [getSingleShow, setSingleShow] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  useEffect(() => {
    const getData = async () => {
      const apiKey = 'gCK1UZiAtKeL5bTCeol9GN91BXQYtQFa'
      const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=GB&apikey=${apiKey}`)
      setEvents(data._embedded.events)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const apiKey = 'gCK1UZiAtKeL5bTCeol9GN91BXQYtQFa'
      const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=GB&apikey=${apiKey}`)
      const filteredData = data._embedded.events.filter(ite => ite.id === modalID)
      setSingleShow(filteredData)
    }
    getData()
  }, [modalID])



  const showModal = e => {
    setModalID(e.target.id)
    setShow(true)
  }




  return (
    <>
      <div className="wrapper">

        {getSingleShow.map(ite =>
          <Modal id="modal-wrapper" show={show} onHide={handleClose} key={ite.id}>
            <Modal.Body>
              <Modal.Title className="modal-title">{ite.name}</Modal.Title>
              <div className="container">
                <div className="row">
                  <div className="col">
                    Column
                  </div>
                  <div className="col">
                    Column
                  </div>
                  <div className="col">
                    <img id="img-modal" src={ite.images[2].url} alt={ite.name} />
                  </div>
                </div>
              </div>



            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
          </Modal>
        )}

        <div className="container-fluid">
          <div className="row flex-row flex-wrap">
            {getEvents.map(ite =>
              <div className="col-3" key={ite.id}>
                <div className="card">
                  <img onClick={showModal} className="card-img-top" src={ite.images[2].url} alt="Card image cap" id={ite.id} />
                  <div className="card-body">
                    <h5 className="card-title">{ite.name}</h5>
                    <p className="card-text">{ite.dates.start.localDate}</p>
                    <p className="card-text">{ite._embedded.venues[0].name}</p>
                  </div>
                  <div className="card-footer">
                    <a className="btn btn-danger"><i className="far fa-heart" id={ite.id}></i></a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
