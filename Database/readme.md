The proposed database for WealthWise is designed to manage user financial information, assets, transactions, financial goals, and resources. It consists of several interconnected tables:

Core Tables:

Users: Stores basic Investor information like Fullname, password and email.
Asset: Tracks various assets owned by investor, including stocks, bonds, real estate, and cryptocurrencies.
Transaction: Records financial transactions related to assets, such as buying, selling, and transferring.
FinancialGoal: Stores investor-defined financial goals with target amounts and dates.

Key Relationships:

Investor is the central table, related to all other tables.
Asset and Transaction are closely related, as transactions are performed on assets.