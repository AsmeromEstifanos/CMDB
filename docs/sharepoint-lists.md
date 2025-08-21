## SharePoint Lists to Create (SVH CMDB)

This document enumerates all SharePoint lists and columns required to support the normalized, atomic data model used by the app. Each list uses SharePoint’s built-in numeric ID as the primary key (PK). Relationships are represented via plain Number columns that store the related list’s ID (no SharePoint Lookup columns). Any multi-value data is modeled as a separate join list.

Notes

- Only send required fields when creating/updating via Graph; do not touch default fields like CreatedBy/ModifiedBy.
- Enable column indexing (and unique constraints where relevant) to improve performance.
- Display Name and Internal Name can differ; suggested internal names are provided for consistency when using Microsoft Graph.
- All foreign keys (FKs) are Number columns (e.g., VentureId), storing the target list item’s ID. The app enforces referential integrity client-side.

### 1) Dimension Lists (reference tables)

Create the following simple lists (one column beyond the default Title). Use these as reference tables:

1. Ventures

   - Title (internal: Title) — Single line text, Required (venture name)

2. Departments

   - Title (Title) — Single line text, Required

3. Categories

   - Title (Title) — Single line text, Required

4. Statuses

   - Title (Title) — Single line text, Required

5. Suppliers

   - Title (Title) — Single line text, Required

6. Tags

   - Title (Title) — Single line text, Required

7. Software_Catalog
   - Title (Title) — Single line text, Required (e.g., "Office 365")

### 2) Core Entity Lists

These lists hold atomic fields only. Any multi-value attributes are moved to join lists below. All relationships are captured by Number FK columns (no Lookup columns).

A) Assets

- Title (internal: Title) — Single line text, Required (Asset Name)
- CategoryId — Number (FK → Categories.ID), Required
- StatusId — Number (FK → Statuses.ID), Required
- VentureId — Number (FK → Ventures.ID), Required
- DepartmentId — Number (FK → Departments.ID), Required
- OwnerName — Single line text
- AssignedToName — Single line text
- UserTitle — Single line text
- AssignedDate — Date only
- Location — Single line text
- AssetTag — Single line text, Indexed, Enforce unique values: Yes
- SerialNumber — Single line text, Indexed
- SupplierId — Number (FK → Suppliers.ID)
- Cost — Currency
- DepreciationRate — Number (percentage)
- AcquiredDate — Date only
- WarrantyEndDate — Date only
- Hostname — Single line text
- IPAddress — Single line text
- OperatingSystem — Single line text
- Notes — Multiple lines of text

Optional: ParentAssetId — Number (FK → Assets.ID) if you prefer simple 1:N parent/child. For flexible relationships, use the Asset Relations join list below.

B) Licenses

- Title (Title) — Single line text, Required (License Name)
- SoftwareId — Number (FK → Software_Catalog.ID)
- LicenseNumber — Single line text, Indexed
- RenewalDate — Date only
- Cost — Currency
- Quantity — Number
- Used — Number
- VentureId — Number (FK → Ventures.ID)
- DepartmentId — Number (FK → Departments.ID)
- SupplierId — Number (FK → Suppliers.ID)
- Notes — Multiple lines of text

### 3) Join / Child Lists (relationships and history)

These lists model multi-value associations or history (audit-like) data without overloading core lists.

1. Asset_Tags (many-to-many)

   - AssetId — Number (FK → Assets.ID), Required
   - TagId — Number (FK → Tags.ID), Required

2. Asset_Software (many-to-many)

   - AssetId — Number (FK → Assets.ID), Required
   - SoftwareId — Number (FK → Software_Catalog.ID), Required

3. Asset_History

   - AssetId — Number (FK → Assets.ID), Required
   - EventDate — Date & Time (Required)
   - Action — Single line text (Required)
   - ActorName — Single line text

4. License_History

   - LicenseId — Number (FK → Licenses.ID), Required
   - EventDate — Date & Time (Required)
   - Action — Single line text (Required)
   - ActorName — Single line text

5. Asset_Relations (parent/child or arbitrary links)

   - ParentAssetId — Number (FK → Assets.ID), Required
   - ChildAssetId — Number (FK → Assets.ID), Required

### 4) Recommended Indexes & Constraints

- Assets.AssetTag — Indexed, Enforce unique values
- Assets.SerialNumber — Indexed
- Licenses.LicenseNumber — Indexed
- All FK Number columns — enable indexing (helps list view thresholds)

### 5) Mapping to App Schema

- Reference lists map to app tables: Ventures, Departments, Categories, Statuses, Suppliers, Tags, Software_Catalog
- Core lists map to: Assets (assetsCore), Licenses (licensesCore)
- Join lists map to: AssetTags, AssetSoftware, AssetHistory, LicenseHistory, AssetRelations
- Use SharePoint item ID as PK. For relationships, store the referenced ID in Number FK columns.

### 6) Graph API Considerations (high-level)

- Use Microsoft Graph Sites/Lists endpoints to create lists/columns and to CRUD items.
- Create columns with deterministic internal names (above) to simplify Graph requests later.
- When writing items: send only the columns you set (Title + required fields) to avoid altering defaults.
- Filter/join client-side by numeric FK columns (e.g., `VentureId eq 3`).
