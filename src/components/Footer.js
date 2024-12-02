import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        py: 4,
        px: 2,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {/* Logo và tên */}
      <Box sx={{ flex: 1, minWidth: '200px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#000',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              %
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            SellSmart Codes
          </Typography>
        </Box>
      </Box>

      {/* Về chúng tôi */}
      <Box sx={{ flex: 1, minWidth: '200px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Về chúng tôi
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Địa chỉ cửa hàng
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Liên lạc
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Theo dõi đơn hàng
          </Link>
        </Typography>
      </Box>

      {/* Liên kết hữu ích */}
      <Box sx={{ flex: 1, minWidth: '200px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Liên kết hữu ích
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Chính sách đổi trả
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Chính sách hỗ trợ
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Hướng dẫn chọn size
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Câu hỏi thường gặp
          </Link>
        </Typography>
      </Box>

      {/* Mạng xã hội */}
      <Box sx={{ flex: 1, minWidth: '200px' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Mạng xã hội
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Facebook
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Tiktok
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Youtube
          </Link>
        </Typography>
        <Typography variant="body2">
          <Link href="#" underline="none" color="inherit">
            Instagram
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
