import { mysqlTable } from 'drizzle-orm/mysql-core'
import { drizzle } from 'drizzle-orm/mysql2'
import { createPool } from 'mysql2'

import { createTables } from '../../src/lib/mysql/index.js'

const poolConnection = createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'coursebuilder',
})

export const {
	accounts,
	accountsRelations,
	permissions,
	permissionsRelations,
	rolePermissions,
	rolePermissionsRelations,
	roles,
	rolesRelations,
	sessions,
	sessionsRelations,
	userPermissions,
	userPermissionsRelations,
	userRoles,
	userRolesRelations,
	users,
	usersRelations,
	verificationTokens,
	coupon,
	couponRelations,
	merchantAccount,
	merchantCharge,
	merchantChargeRelations,
	merchantCoupon,
	merchantCustomer,
	merchantPrice,
	merchantProduct,
	merchantSession,
	prices,
	products,
	productRelations,
	purchases,
	purchaseRelations,
	purchaseUserTransfer,
	purchaseUserTransferRelations,
	communicationChannel,
	communicationPreferenceTypes,
	communicationPreferences,
	communicationPreferencesRelations,
	contentContributions,
	contentContributionRelations,
	contentResource,
	contentResourceRelations,
	contentResourceResource,
	contentResourceResourceRelations,
	contributionTypes,
	contributionTypesRelations,
	resourceProgress,
	contentResourceProduct,
	contentResourceProductRelations,
	upgradableProducts,
	upgradableProductsRelations,
	comments,
	commentsRelations,
	userPrefs,
	userPrefsRelations,
} = createTables(mysqlTable)
export const schema = {
	accounts,
	accountsRelations,
	permissions,
	permissionsRelations,
	rolePermissions,
	rolePermissionsRelations,
	roles,
	rolesRelations,
	sessions,
	sessionsRelations,
	userPermissions,
	userPermissionsRelations,
	userRoles,
	userRolesRelations,
	users,
	usersRelations,
	verificationTokens,
	coupon,
	couponRelations,
	merchantAccount,
	merchantCharge,
	merchantChargeRelations,
	merchantCoupon,
	merchantCustomer,
	merchantPrice,
	merchantProduct,
	merchantSession,
	prices,
	products,
	productRelations,
	purchases,
	purchaseRelations,
	purchaseUserTransfer,
	purchaseUserTransferRelations,
	communicationChannel,
	communicationPreferenceTypes,
	communicationPreferences,
	communicationPreferencesRelations,
	contentContributions,
	contentContributionRelations,
	contentResource,
	contentResourceRelations,
	contentResourceResource,
	contentResourceResourceRelations,
	contributionTypes,
	contributionTypesRelations,
	resourceProgress,
	contentResourceProduct,
	contentResourceProductRelations,
	upgradableProducts,
	upgradableProductsRelations,
	comments,
	commentsRelations,
	userPrefs,
	userPrefsRelations,
}

export const db = drizzle(poolConnection, { schema, mode: 'default' })
