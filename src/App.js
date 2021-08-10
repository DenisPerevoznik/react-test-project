import './App.css';
import {useEffect, useState} from "react";
import {Generator} from "./generator";
import {auditTime, delay, mapTo, merge, tap} from "rxjs";

function App() {
  const [viewObject, setViewObject] = useState({
      sensorA: null,
      sensorB: null,
      sensorC: null,
      sensorD: null
  });
  const maxTime = 1500;
  const minTime = 200;
  const duration = 1300;
  useEffect(() => {

    const generator = new Generator();

    runAllSensors(generator);

    const a = generator.sensorA$.pipe(
        tap(value => processData(value, 'sensorA', generator.getSensorDataA)),
        auditTime(duration));

    const b = generator.sensorB$.pipe(
        tap(value => processData(value, 'sensorB', generator.getSensorDataB)),
        auditTime(duration));

    const c = generator.sensorC$.pipe(
        tap(value => processData(value, 'sensorC', generator.getSensorDataC)),
        auditTime(duration));


    const d = generator.sensorD$.pipe(
        tap(value => processData(value, 'sensorD', generator.getSensorDataD)),
        auditTime(duration));

      const all = merge(
          a.pipe(mapTo('sensorA')),
          b.pipe(mapTo('sensorB')),
          c.pipe(mapTo('sensorC')),
          d.pipe(mapTo('sensorD'))
      )
      all.subscribe(res => {
          setSensor(res, 'no data')
      });
  }, []);

    const processData = (value, name, generator) => {
        setSensor(name, value);
        generator(getRandomTime());
    }

  function runAllSensors(generator){
      generator.getSensorDataA(getRandomTime());
      generator.getSensorDataB(getRandomTime());
      generator.getSensorDataC(getRandomTime());
      generator.getSensorDataD(getRandomTime());
  }

  function setSensor(sensorName, value){
      setViewObject(prev => ({...prev, [sensorName]: value}));
  }

  function getRandomTime(){
    return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
  }

  function checkObj(){
      return !Object.keys(viewObject).find(key => !viewObject[key]);
  }

  return (
    <>
      {checkObj()
      ? <div className="container">
              <span className="item"><b>Sensor A:</b> {viewObject.sensorA}</span>
            <span className="item"><b>Sensor B:</b> {viewObject.sensorB}</span>
            <span className="item"><b>Sensor C:</b> {viewObject.sensorC}</span>
            <span className="item"><b>Sensor D:</b> {viewObject.sensorD}</span>
          </div>
          : <h4>Data is empty</h4>
      }
      </>
  );
}
export default App;
