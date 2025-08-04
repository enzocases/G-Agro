import React, { useState, useEffect } from "react";
import styles from "../assets/styles/calendario.module.css";
import Navbar from "../components/Navbar";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalMessage from "../components/ModalMessage";

import { carregarPlantios } from "../api/plantios";
import { carregarColheitas } from "../api/colheitas"
import {
  carregarEventos,
  carregarEventoPorId,
  cadastrarEvento,
  deleteEvento,
  updateEvento,
} from "../api/eventos";
import {
  carregaLembretePorId,
  carregarLembretes,
  cadastrarLembrete,
  deletarLembrete,
  atualizarLembrete,
} from "../api/lembretes";

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [newReminder, setNewReminder] = useState({
    titulo: "",
    descricao: "",
    //cor: "#000000",
    status: "",
    datalembrete: "",
  });
  const [plantios, setPlantios] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [colheitas, setColheitas] = useState([]);

  const [icon, setIcon] = useState({
    Realizado: "✅",
    EmProgresso: "🔃",
    Pendente: "🕛",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPlantios = await carregarPlantios();
        const dataEventos = await carregarEventos();
        const dataReminders = await carregarLembretes();
        const dataColheitas = await carregarColheitas();




        if (dataPlantios) setPlantios(dataPlantios);
        if (dataReminders) setReminders(dataReminders);

        if (dataEventos) {
          setEventos(dataEventos.filter((e) => e && (e.plantio || e.colheita)));
        }

        if (dataColheitas) setColheitas(dataColheitas);
      } catch (error) {
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const cadastrarEventosParaPlantiosSemEvento = async () => {
      const plantiosComEventos = new Set(
        eventos.map((e) => e.plantio?.id).filter((id) => id != null)
      );

      for (const plantio of plantios) {
        if (!plantiosComEventos.has(plantio.id)) {
          await handleAddEventoPlantio(plantio);
          plantiosComEventos.add(plantio.id); // Marca o plantio como processado
        } else {
        }
      }
    };

    const cadastrarEventosParaColheitasSemEvento = async () => {
      const colheitasComEventos = new Set(
        eventos.map((e) => e.colheita?.id).filter((id) => id != null)
      );
      for (const colheita of colheitas) {
        if (!colheitasComEventos.has(colheita.id)) {
          await handleAddEventoColheita(colheita);
          colheitasComEventos.add(colheita.id);
        }
      }
    }

    if (plantios.length > 0 && eventos.length >= 0) {
      cadastrarEventosParaPlantiosSemEvento();
    }

    if (colheitas.length > 0 && eventos.length >= 0) {
      cadastrarEventosParaColheitasSemEvento();
    }

  }, [plantios, eventos, colheitas]);

  //

  const handleAddEventoPlantio = async (dadosPlantio) => {
    console.log(dadosPlantio)
    const dadosEventoPlantio = {
      tipo_evento: `Plantio de ${dadosPlantio.cultura.nomecultura}`,
      id_plantio: dadosPlantio.id
    };
    console.log("Tentando cadastrar evento:", dadosEventoPlantio);

    try {
      const newEventoPlantio = await cadastrarEvento(dadosEventoPlantio);
      if (newEventoPlantio) {
        console.log("Evento cadastrado com sucesso:", newEventoPlantio);
        setEventos((prevEventos) => [...prevEventos, newEventoPlantio]);
        
        return newEventoPlantio;
      } else {
        console.error("Falha ao cadastrar evento, retorno vazio ou nulo.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
    return null;
  };

  const handleAddEventoColheita = async (dadosColheita) => {
    const dadosEventoColheita = {
      tipo_evento: `Colheita de ${dadosColheita.cultura.nomecultura}`,
      id_colheita: dadosColheita.id,
    }
    console.log("Tentando cadastrar evento:", dadosEventoColheita);

    try {
      const newEventoColheita = await cadastrarEvento(dadosEventoColheita);
      if (newEventoColheita) {
        console.log("Evento cadastrado com sucesso:", newEventoColheita);
        setEventos((prevEventos) => [...prevEventos, newEventoColheita]);
        return newEventoColheita;
      } else {
        console.error("Falha ao cadastrar evento, retorno vazio ou nulo.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
    return null;
  }


  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const monthDays = [
    31,
    isLeapYear(selectedYear) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = monthDays[selectedMonth];

  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {

    // Verifica se há uma mensagem no sessionStorage
    const storedMessage = sessionStorage.getItem("modalMessage");
    if (storedMessage) {
      setModalMessage(storedMessage);
      setIsModalMessageVisible(true);

      // Remove a mensagem do sessionStorage após 4 segundos
      setTimeout(() => {
        setIsModalMessageVisible(false);
        sessionStorage.removeItem("modalMessage"); // Remove a mensagem para não exibir novamente
      }, 3000);
    }
  }, []);

  const toggleDropdown = (type) => {
    if (type === "month") {
      setIsMonthDropdownOpen(!isMonthDropdownOpen);
      setIsYearDropdownOpen(false);
    } else {
      setIsYearDropdownOpen(!isYearDropdownOpen);
      setIsMonthDropdownOpen(false);
    }
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setIsMonthDropdownOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDayClick = (day) => {

    const datalembrete = day >= 10 ? `${selectedYear}-${selectedMonth + 1}-${day}` : `${selectedYear}-${selectedMonth + 1}-0${day}`
    const selectedReminder = reminders.find(
      (e) => {
        console.log("Lembrete: ", e.dataLembrete)
        console.log("Data atual: ", datalembrete)
        return e.datalembrete === datalembrete
      }
    );

    console.log("Lembrete encontrado:", selectedReminder);

    setNewReminder(
      selectedReminder || {
        titulo: "",
        descricao: "",
        status: "",
        datalembrete,
      }
    );
    setSelectedDay(selectedDay === day ? null : day);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  /*
  const handleAddOrUpdateReminder = () => {
    setReminders((prev) =>
      prev.some((rem) => rem.dataLembrete === newReminder.dataLembrete)
        ? prev.map((rem) => (rem.dataLembrete === newReminder.dataLembrete ? { ...rem, ...newReminder } : rem))
        : [...prev, newReminder]
    );
    setSelectedDay(null);
  };
*/

  // Função para Atualizar Lembretes ou Cadastrar ///////////////////////////////////////////////////////////


  const handleAddOrUpdateReminder = async () => {
    if (newReminder.id) {
      const updatedReminder = await atualizarLembrete(
        newReminder.id,
        newReminder
      );
      if (updatedReminder) {
        setReminders((prev) =>
          prev.map((rem) => (rem.id === newReminder.id ? updatedReminder : rem))
        );
      }
    } else {
      // Cadastrar novo lembrete
      const addedReminder = await cadastrarLembrete(newReminder);
      if (addedReminder) {
        setReminders((prev) => [...prev, addedReminder]);
      }
    }
    setSelectedDay(null);
  };
  /*
  
  const handleDeleteReminder = () => {
    setReminders((prev) => prev.filter((rem) => rem.dataLembrete !== newReminder.dataLembrete));
    setSelectedDay(null);
  };
*/

  // Função de Deletar um Lembrete ///////////////////////////////////////////////////

  const handleDeleteReminder = async () => {
    if (newReminder.id) {
      const success = await deletarLembrete(newReminder.id);
      if (success) {
        setReminders((prev) => prev.filter((rem) => rem.id !== newReminder.id));
      }
    }
    setSelectedDay(null);
  };

  function formatMonth(month) {
    return month < 9 ? `0${month + 1}` : `${month + 1}`;
  }

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-start-${i}`} className={`${styles.calendarDay} ${styles.empty}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      const datalembrete = i < 10 
  ? `${selectedYear}-${formatMonth(selectedMonth)}-0${i}` 
  : `${selectedYear}-${formatMonth(selectedMonth)}-${i}`;
const dataEvento = i < 10 
  ? `${selectedYear}-${formatMonth(selectedMonth)}-0${i}` 
  : `${selectedYear}-${formatMonth(selectedMonth)}-${i}`;
      const dayReminder = reminders.find((e) => e.datalembrete === datalembrete);
      const dayEvent = eventos.find(
        (e) => 
          e.plantio?.dataplantio === dataEvento ||
          e.colheita?.dataInicio === dataEvento
          
          
      );
    

      const statusIcon = icon[dayReminder?.status]

      //console.log("Day:", i, "Status:", dayReminder?.status, "Icon:", statusIcon);
      days.push(
        <div
          key={i}
          className={`${styles.calendarDay} ${selectedDay === i ? styles.selectedDay : ""}`}
          onClick={() => handleDayClick(i)}
        >
          <span className={styles.dayNumber}>{i}</span>
          {dayReminder && (
            <div className={styles.event} style={{ backgroundColor: "#444" }}>
              <span>{statusIcon}</span> {dayReminder.titulo}
            </div>
          )}

         
          {dayEvent && (
            <div
              className={styles.event}
              style={{ backgroundColor: "#333" }}
            >
              {" "}
              {/* Use uma cor diferente para eventos */}
              <span>📅</span> {dayEvent.tipo_evento}{" "}
              {/* Ajuste conforme o ícone desejado */}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarContainer}>
          <header className={styles.calendarHeader}>
            <div
              onClick={() => toggleDropdown("month")}
              className={styles.monthSelector}
            >
              {monthNames[selectedMonth]}
              <span className={`${styles.dropdownIcon} `}>
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  className={`${styles.icon} ${isMonthDropdownOpen ? styles.isOpen : ""
                    }`}
                />
              </span>
              {isMonthDropdownOpen && (
                <div className={styles.dropdown}>
                  {monthNames.map((month, index) => (
                    <div
                      key={month}
                      className={styles.dropdownItem}
                      onClick={() => handleMonthSelect(index)}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              onClick={() => toggleDropdown("year")}
              className={styles.yearSelector}
            >
              {selectedYear}
              <span className={`${styles.dropdownIcon} `}>
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  className={`${styles.icon} ${isYearDropdownOpen ? styles.isOpen : ""
                    }`}
                />
              </span>
              {isYearDropdownOpen && (
                <div className={styles.dropdown}>
                  {[...Array(10)].map((_, index) => {
                    const year = selectedYear - 5 + index;
                    return (
                      <div
                        key={year}
                        className={styles.dropdownItem}
                        onClick={() => handleYearSelect(year)}
                      >
                        {year}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </header>
          <div className={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <div key={`weekday-${index}`} className={styles.calendarWeekday}>
                {day}
              </div>
            ))}
          </div>
          <div className={styles.calendarGrid}>{generateDays()}</div>
        </div>
        {selectedDay != null && (
          <div className={styles.sidebar}>
            <h3>Lembrete para o dia {selectedDay}</h3>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              name="titulo"
              value={newReminder.titulo}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Título do Lembrete"
            />
            <label className={styles.label}>Descrição</label>
            <textarea
              name="descricao"
              value={newReminder.descricao}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Descrição do Lembrete"
            />
            {/*
            <label className={styles.label}>Cor</label>
            <input
              type="color"
              name="cor"
              value={newReminder.cor}
              onChange={handleInputChange}
              className={styles.input}
            />
            */}
            <label className={styles.label}>Status</label>
            <select
              name="status"
              value={newReminder.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="" disabled selected className={styles.option}>
                Selecione um Status
              </option>
              <option className={styles.option} value="Pendente">Pendente</option>
              <option className={styles.option} value="EmProgresso">Em Andamento</option>
              <option className={styles.option} value="Realizado">Feito</option>
            </select>
            <button
              onClick={handleAddOrUpdateReminder}
              className={styles.addBtn}
            >
              {reminders.some(
                (rem) => rem.datalembrete === newReminder.datalembrete
              )
                ? "Editar Lembrete"
                : "Adicionar Lembrete"}
            </button>
            {reminders.some(
              (rem) => rem.datalembrete === newReminder.datalembrete
            ) && (
                <button onClick={handleDeleteReminder} className={styles.addBtn}>
                  Deletar Lembrete
                </button>
              )}
          </div>
        )}
      </div>
      <ModalMessage
        message={sessionStorage.getItem("modalMessage")}
        show={isModalMessageVisible}
      />
    </div>
  );
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

