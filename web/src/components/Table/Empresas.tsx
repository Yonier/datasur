"use client";

import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import Modal from '../Modal';
import Card from '../Card';
import ModalEmpresas from '../Modal/Empresas';

import type { Empresa, EmpresasResponse } from '@/types/api';

export default function () {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<EmpresasResponse>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });

  const loadData = () => {
    setLoading(true);
    fetch(`/api/empresas?${new URLSearchParams({
      page: page.toString(),
      search: search ?? null
    }).toString()}`)
    .then(r => r.json())
    .then((d: EmpresasResponse) => {
      setData(d)
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    loadData();
  },[page, search]);

  const [modalDelete, setModalDelete] = useState({
    active: false,
    id: null as null | number
  });
  const modalDeleteConfirm = () => {
    setLoading(true);
    fetch(`/api/empresas/${modalDelete.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      loadData();
      alert('Eliminado correctamente!');
    })
    .finally(() => {
      setLoading(false);
      setModalDelete({
        active: false,
        id: null
      });
    })
  }

  const [modalItem, setModalItem] = useState({
    active: false,
    item: null as null | Empresa
  });

  return (
    <div className='text-left'>
      <Modal active={modalDelete.active}>
        <Card className='text-white text-center flex flex-col gap-2'>
          <div className="text-xl font-bold">¿Estas segur@?</div>
          <div className='flex gap-2 justify-center'>
            <button
            className='bg-blue-800 text-white p-2 rounded'
            disabled={loading}
            onClick={() => { modalDeleteConfirm() }}
            >
              Confirmar
            </button>
            <button
            className='bg-red-800 text-white p-2 rounded'
            disabled={loading}
            onClick={() => {
              setModalDelete({
                active: false,
                id: null
              });
            }}
            >
              Cancelar
            </button>
          </div>
        </Card>
      </Modal>
      <ModalEmpresas
      loading={loading}
      onLoadingChange={v => { setLoading(v); }}
      active={modalItem.active}
      item={modalItem.item}
      onClose={() => {
        setModalItem({
          active: false,
          item: null
        });
        loadData();
      }}
      />

      <div className='flex justify-between'>
        <div className='border border-gray-400 flex items-center rounded'>
          <PencilIcon className='w-4 h-4 mx-2 text-gray-400'/>
          <input
          type="text"
          className='min-w-4 outline-0'
          placeholder='Buscar...'
          disabled={loading}
          value={search}
          onChange={e => {
            setPage(1);
            setSearch(e.target.value);
          }}
          />
        </div>
        <button
        className='bg-blue-800 text-white p-2 rounded'
        disabled={loading}
        onClick={() => {
          setModalItem({
            active: true,
            item: null
          });
        }}
        >
          <PlusIcon className='w-4 h-4'/>
        </button>
      </div>
      <div className='w-full overflow-x-auto flex'>
        <table className="w-full my-4 table-auto">
          <thead>
            <tr>
              <th className='border-b pb-3'>RUT</th>
              <th className='border-b pb-3'>Razón Social</th>
              <th className='border-b pb-3'>Actividad Económica</th>
              <th className='border-b pb-3'>Fecha Inicio Actividades</th>
              <th className='border-b pb-3'>Región</th>
              <th className='border-b pb-3'>Provincia</th>
              <th className='border-b pb-3'>Comuna</th>
              <th className='border-b pb-3'></th>
            </tr>
          </thead>
          {
            loading ? (
              <tbody>
                <tr>
                  <td colSpan={8} className='border-b py-3'>
                    <ArrowPathIcon className='w-6 h-6 animate-spin text-gray-500 mx-auto'/>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data.results.map((r, ri) => (
                <tr
                key={ri}
                >
                  <td className='border-b py-3'>{r.rut}</td>
                  <td className='border-b py-3'>{r.razon_social}</td>
                  <td className='border-b py-3'>{r.actividad_economica}</td>
                  <td className='border-b py-3'>{r.fecha_inicio_actividades}</td>
                  <td className='border-b py-3'>{r.region}</td>
                  <td className='border-b py-3'>{r.provincia}</td>
                  <td className='border-b py-3'>{r.comuna}</td>
                  <td className='border-b py-3 flex justify-end gap-2'>
                    <button
                    className='bg-yellow-800 text-white p-2 rounded'
                    onClick={() => {
                      setModalItem({
                        active: true,
                        item: r
                      });
                    }}
                    >
                      <PencilIcon className='w-4 h-4'/>
                    </button>
                    <button
                    className='bg-red-800 text-white p-2 rounded'
                    onClick={() => {
                      setModalDelete({
                        active: true,
                        id: r.id
                      });
                    }}
                    >
                      <TrashIcon className='w-4 h-4'/>
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            )
          }
        </table>
      </div>
      <div className='flex flex-col gap-2'>
        <strong>Página {page} de {Math.round(data.count/5)}</strong>
        <div className='flex gap gap-2'>
          <button
          className='bg-blue-800 text-white p-2 px-3 rounded'
          disabled={!data.previous}
          onClick={() => {
            setPage(page-1);
          }}
          >
            <ChevronLeftIcon className='w-4 h-4'/>
          </button>
          <button
          className='bg-blue-800 text-white p-2 px-3 rounded'
          disabled={!data.next}
          onClick={() => {
            setPage(page+1);
          }}
          >
            <ChevronRightIcon className='w-4 h-4'/>
          </button>
        </div>
      </div>
    </div>
  )
}