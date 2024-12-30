import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Image, Card } from 'antd';
import { UserOutlined, EyeOutlined, CopyOutlined, DeleteOutlined, SendOutlined, GlobalOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { message, Modal } from '@/utils/AntdGlobal'
// import api from '@/api/page';
// import EnvTag from './EnvTag';
// import { PageItem } from '@/api/types';
// import styles from './../../index.module.less';

// 页面列表项
const PageCard = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  // 页面操作
  const handleAction = async (type: string, params: PageItem) => {
    if (type === 'preview') {
      if (!params.previewImg) {
        return message.warning('该页面未生成预览图');
      }
      setShowPreview(true);
      setPreviewUrl(params.previewImg);
      return;
    }

    if (type === 'edit') {
      return navigate(`/editor/${params?.id}/edit`);
    }
    if (type === 'copy') {
      // return copy?.(params);
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确认',
        content: '删除后，该页面无法恢复，请谨慎操作。',
        okText: '确认',
        okButtonProps: { danger: true },
        cancelText: '取消',
        onOk: async () => {
          await api.delPageData({
            id: params.id,
          });
          message.success('删除成功');
          refresh();
        },
      });
    }
  };
  return (<div>PageCard</div>)
};

export default PageCard;
