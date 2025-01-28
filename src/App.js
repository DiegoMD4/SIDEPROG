import { React, useState, useEffect } from "react";
import logo from "./logo.svg";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import CountUp from "react-countup";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

function App() {
  const [item, setItems] = useState(null);
  const [dictamenResultado, setDictamenResultado] = useState(null);
  const [expedientesCaducados, setExpedientesCaducados] = useState(null);
  const [tiempoPromedio, setTiempoPromedio] = useState(null);
  const [ongMultiExpAnual, setOngMultiExpAnual] = useState(null);
  const [expEM, setExpEM] = useState(null);
  const [expXAnio, setExpXAnio] = useState(null);
  const [expMonitoreados, setExpMonitoreados] = useState(null);
  const [listadoONGD, setListadoONGD] = useState(null);
  const [listadoONGDProyecto, setListadoONGDProyecto] = useState(null);
  const [listadoONGDAnioFiscal, setListadoONGDAnioFiscal] = useState(null);
  const [anios, setAnio] = useState(null);

  useEffect(() => {
    fetchAnios();
  }, []);

  async function fetchData(_anio) {
    const parametros = {
      actividad: "get_expedientesPorEtapa",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const labels = result.map((dt) => dt.Etapa);
      const values = result.map((dt) => dt.Cantidad);
      setItems({
        labels: labels,
        datasets: [
          {
            label: "Etapa",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDictamenFavorable(_anio) {
    const parametros = {
      actividad: "get_cantidadFavorableDesfavorable",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const labels = result.map((dt) => dt.EsFavorable);
      const values = result.map((dt) => dt.Cantidad);
      setDictamenResultado({
        labels: labels,
        datasets: [
          {
            label: "Cantidad",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExpedientesCaducados(_anio) {
    const parametros = {
      actividad: "get_actualmenteCaducadosXAnio",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const values = result.map((dt) => dt.Cantidad);
      setExpedientesCaducados(values[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTiempoPromedio(_anio) {
    const parametros = {
      actividad: "get_tiempoPromedioUVUxDRP",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const values = result.map((dt) => dt.promedioGlobal);
      setTiempoPromedio(values[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCantidadONGMultipleExpedienteAnual(_anio) {
    const parametros = {
      actividad: "get_ongdMultiExpedienteAnual",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const values = result.map((dt) => dt.ONG_Expedientes_Multiples_Por_Anio);
      setOngMultiExpAnual(values[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExpEM(_anio) {
    const parametros = {
      actividad: "get_cantidadExpedientesFlagModificacion",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const values = result.map((dt) => dt.Cantidad);
      setExpEM(values[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExpXAnio() {
    const parametros = {
      actividad: "get_cantidadExpedientesPorAnio",
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const labels = result.map((dt) => dt.Anio);
      const values = result.map((dt) => dt.Cantidad);
      setExpXAnio({
        labels: labels,
        datasets: [
          {
            label: "Años",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExpMonitoreados(_anio) {
    const parametros = {
      actividad: "get_cantidadExpedientesMonitoreados",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      const values = result.map((dt) => dt.Cantidad);
      setExpMonitoreados(values[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchListadoONGD(_anio) {
    const parametros = {
      actividad: "get_listadoONGD",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      setListadoONGD(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchListadoONGDProyecto(_anio) {
    const parametros = {
      actividad: "get_listadoONGDEjecutanProyecto",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      setListadoONGDProyecto(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchListadoONGDAnioFiscal(_anio) {
    const parametros = {
      actividad: "get_listadoONGDEjecutanAnioFiscal",
      anio: _anio,
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      setListadoONGDAnioFiscal(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAnios() {
    const parametros = {
      actividad: "get_listAnios",
    };
    try {
      const res = await fetch(
        "http://localhost:7609/negocio/php/tree_sideprog.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await res.text();
      const result = JSON.parse(text);
      console.log(result);
      setAnio(result.map((Anio, index) => (
        <option key={index} value={Anio.Anio}>{Anio.Anio}</option>
      )));
    } catch (error) {
      console.log(error);
    }
  }

  let handleAnioChange = (e) => {
    fetchData(e.target.value);
    fetchDictamenFavorable(e.target.value);
    fetchExpedientesCaducados(e.target.value);
    fetchTiempoPromedio(e.target.value);
    fetchCantidadONGMultipleExpedienteAnual(e.target.value);
    fetchExpEM(e.target.value);
    fetchExpXAnio();
    fetchExpMonitoreados(e.target.value);
    fetchListadoONGD(e.target.value);
    fetchListadoONGDProyecto(e.target.value);
    fetchListadoONGDAnioFiscal(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <img
            src={logo}
            style={{ height: "150px" }}
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="col-12 text-center">
          {
            <select onChange={handleAnioChange}>
              <option value="⬇️ Seleccionar un Año ⬇️">
                {" "}
                -- Seleccionar un Año --{" "}
              </option>
              {/* Mapping through each fruit object in our fruits array
               and returning an option element with the appropriate attributes / values.
              */}
              {anios}
            </select>
          }
        </div>
        <div className="col-4" style={{ height: "400px" }}>
          {item && (
            <Bar
              data={item}
              options={{
                indexAxis: "y",
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Cantidad Expedientes por Etapa/Estatus DRP",
                    font: { size: 26, family: "rubik" },
                  },
                  legend: { display: true, position: "bottom" },
                },
                maintainAspectRatio: false,
              }}
            />
          )}
        </div>
        <div className="col-4" style={{ height: "400px" }}>
          {dictamenResultado && (
            <Doughnut
              data={dictamenResultado}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Dictamenes Favorables / Desfavorables",
                    font: { size: 26, family: "rubik" },
                  },
                  legend: { display: true, position: "bottom" },
                },
                maintainAspectRatio: false,
              }}
            />
          )}
        </div>
        <div className="col-4" style={{ height: "400px" }}>
          {expXAnio && (
            <Bar
              data={expXAnio}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Cantidad Expedientes por Año",
                    font: { size: 26, family: "rubik" },
                  },
                  legend: { display: false, position: "bottom" },
                },
                maintainAspectRatio: false,
              }}
            />
          )}
        </div>
      </div>
      <div className="row">
        <pre />
        <pre />
        <div className="col-3 text-center">
          <h4>Expedientes Caducados</h4>
          <h2>
            {expedientesCaducados && (
              <CountUp start={0} end={expedientesCaducados} duration={2.5} />
            )}
          </h2>
        </div>
        <div className="col-3 text-center">
          <h4>Tiempo promedio de traslado de expedientes UVU a DRP</h4>
          <h2>
            {tiempoPromedio && (
              <CountUp start={0} end={tiempoPromedio} duration={2.5} />
            )}
          </h2>
        </div>
        <div className="col-2 text-center">
          <h4>Cantidad de ONGD que presenta multiples expedientes en el año</h4>
          <h2>
            {ongMultiExpAnual && (
              <CountUp start={0} end={ongMultiExpAnual} duration={2.5} />
            )}
          </h2>
        </div>
        <div className="col-2 text-center">
          <h4>Expedientes para Modificación</h4>
          <h2>{expEM && <CountUp start={0} end={expEM} duration={2.5} />}</h2>
        </div>
        <div className="col-2 text-center">
          <h4>Expedientes Monitoreados</h4>
          <h2>
            {expMonitoreados && (
              <CountUp start={0} end={expMonitoreados} duration={2.5} />
            )}
          </h2>
        </div>
      </div>
      <div className="row">
        <pre />
        <pre />
        <div className="col-4">
          <h4 className="text-center">Listado ONGD</h4>
          {listadoONGD && (
            <DataTable
              data={listadoONGD}
              columns={[
                { data: "IdONG" },
                { data: "Nombre" },
                { data: "Siglas" },
                { data: "Vetada" },
              ]}
              className="display"
              options={{
                responsive: true,
                select: true,
              }}
            >
              <thead>
                <tr>
                  <th>IdONG</th>
                  <th>Nombre</th>
                  <th>Siglas</th>
                  <th>Vetada</th>
                </tr>
              </thead>
            </DataTable>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">ONGD que ejecutan por Proyecto</h4>
          {listadoONGDProyecto && (
            <DataTable
              data={listadoONGDProyecto}
              columns={[
                { data: "IdONG" },
                { data: "Nombre" },
                { data: "Siglas" },
                { data: "Vetada" },
              ]}
              className="display"
              options={{
                responsive: true,
                select: true,
              }}
            >
              <thead>
                <tr>
                  <th>IdONG</th>
                  <th>Nombre</th>
                  <th>Siglas</th>
                  <th>Vetada</th>
                </tr>
              </thead>
            </DataTable>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">ONGD que ejecutan por año fiscal</h4>
          {listadoONGDAnioFiscal && (
            <DataTable
              data={listadoONGDAnioFiscal}
              columns={[
                { data: "IdONG" },
                { data: "Nombre" },
                { data: "Siglas" },
                { data: "Vetada" },
              ]}
              className="display"
              options={{
                responsive: true,
                select: true,
              }}
            >
              <thead>
                <tr>
                  <th>IdONG</th>
                  <th>Nombre</th>
                  <th>Siglas</th>
                  <th>Vetada</th>
                </tr>
              </thead>
            </DataTable>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
