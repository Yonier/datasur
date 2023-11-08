import { useEffect, useState } from 'react';

import Modal from '../Modal';
import Card from '../Card';

import type { Empresa, ValidationError } from '@/types/api';

export default function (props: {
  loading: boolean,
  onLoadingChange: (loading: boolean) => void,
  active: boolean,
  item: null | Empresa,
  onClose: () => void,
}) {
  const initFormData = () => ({
    rut: '',
    razon_social: '',
    actividad_economica: '',
    fecha_inicio_actividades: new Date().getFullYear() + '-01-01',
    region: 'Santiago',
    provincia: 'XIII REGION METROPOLITANA	',
    comuna: 'SANTIAGO', 
  });
  const [formData, setFormData] = useState(initFormData());

  useEffect(() => {
    if (props.active && props.item)
      setFormData({
        ...props.item
      });
  }, [props.active]);

  const close = () => {
    setFormData(initFormData());
    props.onClose();
  }

  const add = () => {
    props.onLoadingChange(true);
    fetch('/api/empresas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData
      })
    })
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(() => {
      close();
      alert('Empresa agregada correctamente!');
    })
    .catch(async (e: Response) => {
      if(e.status === 400){
        const d = (await e.json()) as ValidationError;
        const ks = Object.keys(d);
        // Retornamos solo el primer error
        if(d[ks[0]][0] !== undefined)
          alert(d[ks[0]][0]);
        else
          throw new Error();
      } else { throw new Error(); }
    })
    .catch(() => { alert('Ha ocurrido un error!'); })
    .finally(() => {
      props.onLoadingChange(false);
    });
  }

  const update = () => {
    if(!props.item) return;

    props.onLoadingChange(true);
    fetch('/api/empresas/' + props.item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData
      })
    })
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(() => {
      close();
      alert('Empresa actualizada correctamente!');
    })
    .catch(async (e: Response) => {
      if(e.status === 400){
        const d = (await e.json()) as ValidationError;
        const ks = Object.keys(d);
        // Retornamos solo el primer error
        if(d[ks[0]][0] !== undefined)
          alert(d[ks[0]][0]);
        else
          throw new Error();
      } else { throw new Error(); }
    })
    .catch(() => { alert('Ha ocurrido un error!'); })
    .finally(() => {
      props.onLoadingChange(false);
    });
  }

  return (
    <Modal active={props.active}>
      <Card
      className='mx-auto flex flex-1 flex-col gap-2'
      >
        <div className="text-white text-xl font-bold">{ props.item ? 'Editar' : 'Agregar' } Empresa</div>
        <hr className='border-gray-500'/>
        <div className='py-2 flex flex-col gap-2'>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='RUT'
            disabled={props.loading}
            value={formData.rut}
            onChange={e => {
              setFormData({
                ...formData,
                rut: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Razón Social'
            disabled={props.loading}
            value={formData.razon_social}
            onChange={e => {
              setFormData({
                ...formData,
                razon_social: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Actividad Económica'
            disabled={props.loading}
            value={formData.actividad_economica}
            onChange={e => {
              setFormData({
                ...formData,
                actividad_economica: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Fecha Inicio Actividades'
            disabled={props.loading}
            value={formData.fecha_inicio_actividades}
            onChange={e => {
              setFormData({
                ...formData,
                fecha_inicio_actividades: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Región'
            disabled={props.loading}
            value={formData.region}
            onChange={e => {
              setFormData({
                ...formData,
                region: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Provincia'
            disabled={props.loading}
            value={formData.provincia}
            onChange={e => {
              setFormData({
                ...formData,
                provincia: e.target.value
              });
            }}
            />
          </div>
          <div className='p-2 rounded bg-white min-w-4'>
            <input
            type="text"
            className='w-full outline-0'
            placeholder='Comuna'
            disabled={props.loading}
            value={formData.comuna}
            onChange={e => {
              setFormData({
                ...formData,
                comuna: e.target.value
              });
            }}
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <button
          className='bg-blue-800 text-white p-2 rounded'
          disabled={props.loading}
          onClick={() => { props.item ? update() : add() }}
          >
            { props.item ? 'Editar' : 'Agregar' }
          </button>
          <button
          className='bg-red-800 text-white p-2 rounded'
          disabled={props.loading}
          onClick={() => {
            close();
          }}
          >
            Cancelar
          </button>
        </div>
      </Card>
    </Modal>
  )
}
