---
page: "dashboard"
version: "1.0.0"
purpose: "Hiển thị overview quan trọng cho users, giúp họ hiểu tình trạng hiện tại và thực hiện hành động nhanh chóng"
author: "product-team"
ux_principles:
  - "Prioritize scanability over detail"
  - "Progressive disclosure - show summary first, details on demand"
  - "Consistent visual hierarchy"
validation:
  accessibility: "WCAG-2.1-AA"
---

# Dashboard Contract

## Business Purpose

Trang dashboard là entry point chính của ứng dụng. Nó giúp users:
- Xem tổng quan tình trạng tài khoản
- Theo dõi metrics quan trọng
- Thực hiện hành động phổ biến nhanh chóng

## User Journey

1. User login → Dashboard loads
2. Scan overview metrics (5-10 seconds)
3. Click vào chi tiết nếu cần
4. Thực hiện action từ quick actions

## Visual Reference

![Dashboard Reference](./references/dashboard-v1.png)

## Acceptance Criteria

- [ ] Load time < 2 seconds
- [ ] Hiển thị ít nhất 3 metrics chính
- [ ] Quick actions disponíveis trong 1 click
- [ ] Mobile responsive

## Regression Rules

- KHÔNG được ẩn metrics chính
- KHÔNG được thay đổi vị trí quick actions
- KHÔNG được increase load time > 20%
