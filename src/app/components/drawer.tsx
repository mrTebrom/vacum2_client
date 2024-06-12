import { useEffect, ReactNode } from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons'
interface IDrawer {
  open: boolean;
  close: () => void;
  title?: ReactNode;
  children: ReactNode;
}

const Drawer = ({ open, close, title, children }: IDrawer) => {
  useEffect(() => {
    const handleRouteChange = () => {
      // Закрываем выдвижной блок при смене маршрута
      close();
    };

    // Добавляем слушатель события изменения маршрута
    window.addEventListener('routeChangeStart', handleRouteChange);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChange);
    };
  }, [close]);

  return (
    <>
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignContent: 'center', marginBottom: 10 }}>
          {typeof title === 'string' ? <p style={{ fontSize: 16, fontWeight: 'bold', margin: 0 }}>{title}</p> : title}
          
          <span className="close-btn" onClick={close}>
            <ArrowLeftOutlined />
          </span>
        </div>
        {children}
      </div>
      <div className={`overlay ${open ? 'visible' : ''}`} onClick={close}></div>

      <style jsx>{`
        .drawer {
          height: 100%;
          width: 450px;
          position: fixed;
          top: 0;
          right: -120%;
          z-index: 2;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
          background-color: #f8f9fa;
          padding: 25px 15px;
          max-width: 90%; 
        }

        .drawer a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 18px;
          color: #007bff;
          display: block;
          transition: 0.3s;
        }

        .drawer a:hover {
          color: #0056b3;
        }

        .drawer .close-btn {
          position: absolute;
          top: 25px;
          right: 10px; 
          margin-left: 50px;
          font-weight: 100;
        }

        .drawer.open {
          transition: 0.5s;
          right: 0;
        }

        #menu-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          font-size: 24px;
          cursor: pointer;
          color: #fff;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
          z-index: -1;
          transition: background 0.5s;
        }
        .overlay.visible {
          transition: background 0.5s;
          z-index: 1;
          background: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </>
  );
};

export default Drawer;
