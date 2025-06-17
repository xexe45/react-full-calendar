import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/src/sweetalert2.scss'
import { es } from 'date-fns/locale/es';
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";
import { useDispatch } from "react-redux";
import { useCalendarStore } from "../../hooks/useCalendarStore";
registerLocale('es', es)
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const initialValue = {
    title: 'Fernando',
    notes: 'Herrera',
    start: new Date(),
    end: addHours(new Date(), 2)
}
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
export const CalendarModal = () => {
  const { isDateModalOpen, startAt, closeDateModal } = useUiStore();
  const { activeEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValue, setFormValue] = useState(initialValue);
  const {onStartNewEvent} = useCalendarStore();

  useEffect(() => {
    if(activeEvent){
      setFormValue(activeEvent);
    }
    
  }, [activeEvent])

  const closeModal = () => {
    closeDateModal()
  };
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';
    return (formValue.title.length > 0) ? '' : 'is-invalid';
  }, [formValue.title, formSubmitted])
  const onInputChange = ({target}) => {
    setFormValue(
        {
            ...formValue,
            [target.name]: target.value
        }
    )
  }

  const onDateChange = (event, changing) => {
    setFormValue({
        ...formValue,
        [changing]: event
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValue.end, formValue.start);
    if(isNaN(difference) || difference <= 0){
        Swal.fire('Fechas incorrectas', 'Revisar las fechas.', 'error')
        return;
    }

    if(formValue.title.length == 0) return;

    console.log(formValue);
    const data = {
      ...formValue,
      end: new Date(formValue.end).toISOString()
    }

    onStartNewEvent(data);
    

  } 
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
         <div>
             <DatePicker onChange={(event) => onDateChange(event, 'start')} className="form-control" selected={formValue.start} dateFormat="P" locale="es"/>
         </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
            <div>
                 <DatePicker onChange={(event) => onDateChange(event, 'end')} className="form-control" selected={formValue.end} dateFormat="P" locale="es" />
            </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            value={formValue.title} name="title"
            autoComplete="off"
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValue.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
