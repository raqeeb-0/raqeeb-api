import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import { logger } from '@lib/logger.js';
import { dbCheck } from '@lib/dbCheck.js';
import { rateLimiter } from '@middlewares/rateLimiter.js';
import {
  errorHandler,
  notFoundHandler
} from '@middlewares/errorHandler.js';

import { welcome } from '@services/welcome.js';

import userRoutes from '@routes/user.js';
import organizationRoutes from '@routes/organization.js';
import authenticationRoutes from '@routes/authentication.js';

import invoiceRoutes from '@routes/invoice.js';
import purchaseItemRoutes from '@routes/purchaseItem.js';
import purchaseItemCategoryRoutes from '@routes/purchaseItemCategory.js';
import expensePurchaseRoutes from '@routes/expensePurchase.js';
import materialPurchaseRoutes from '@routes/materialPurchase.js';
import saleRoutes from '@routes/sale.js';
import customerRoutes from '@routes/customer.js';
import supplierRoutes from '@routes/supplier.js';
import productionOrderRoutes from '@routes/productionOrder.js';
import materialRoutes from '@routes/material.js';
import materialCategoryRoutes from '@routes/materialCategory.js';
import expenseRoutes from '@routes/expense.js';
import expenseCategoryRoutes from '@routes/expenseCategory.js';
import productRoutes from '@routes/product.js';
import productCategoryRoutes from '@routes/productCategory.js';


const app = express();

const morganLogFormat =
  process.env.APP_ENV === 'development' ? 'dev' : 'combined';
const morganOptions = {
  stream: {
    write: (message, encoding) => logger.info(message.trim())
  }
}

const corsHeaders = {
  origin: process.env.CLIENT_URL,
  credentials: true,
}

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(morgan(morganLogFormat));
app.use(cookieParser());
app.use(cors(corsHeaders));
if (process.env.FILE_LOGGING === 'on') {
  app.use(morgan('combined', morganOptions));
}
if (process.env.RATE_LIMITING === 'on') {
  app.use(rateLimiter);
}

// Routes
const appRouter = express.Router();
const orgRouter = express.Router();

app.get('/', welcome);
app.use('/api/v2', appRouter);
appRouter.get('/', welcome);
appRouter.use('/auth', authenticationRoutes);
appRouter.use('/organizations', organizationRoutes);
appRouter.use('/users', userRoutes);

appRouter.use('/organization', orgRouter);
orgRouter.use('/invoices', invoiceRoutes);
orgRouter.use('/purchase-items', purchaseItemRoutes);
orgRouter.use('/purchase-item-categories', purchaseItemCategoryRoutes);
// orgRouter.use('/expense-purchases', expensePurchaseRoutes);
// orgRouter.use('/material-purchases', materialPurchaseRoutes);
orgRouter.use('/sales', saleRoutes);
orgRouter.use('/suppliers', supplierRoutes);
orgRouter.use('/customers', customerRoutes);
orgRouter.use('/production-orders', productionOrderRoutes);
// orgRouter.use('/materials', materialRoutes);
// orgRouter.use('/material-categories', materialCategoryRoutes);
// orgRouter.use('/expenses', expenseRoutes);
// orgRouter.use('/expense-categories', expenseCategoryRoutes);
orgRouter.use('/products', productRoutes);
orgRouter.use('/product-categories', productCategoryRoutes);

// Not Found Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
  dbCheck();
});

