package com.dbnorm.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class SchemaRequest {

    private String tableName;

    public SchemaRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SchemaRequest(String tableName, @NotEmpty List<String> attributes, List<String> primaryKey,
			@NotEmpty List<FunctionalDependencyDto> functionalDependencies) {
		super();
		this.tableName = tableName;
		this.attributes = attributes;
		this.primaryKey = primaryKey;
		this.functionalDependencies = functionalDependencies;
	}
	@Override
	public String toString() {
		return "SchemaRequest [tableName=" + tableName + ", attributes=" + attributes + ", primaryKey=" + primaryKey
				+ ", functionalDependencies=" + functionalDependencies + "]";
	}

	@NotEmpty
    private List<String> attributes;

    // primaryKey may be a single element list or multiple items
    private List<String> primaryKey;

    @NotEmpty
    private List<FunctionalDependencyDto> functionalDependencies;

    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }
    public List<String> getAttributes() { return attributes; }
    public void setAttributes(List<String> attributes) { this.attributes = attributes; }
    public List<String> getPrimaryKey() { return primaryKey; }
    public void setPrimaryKey(List<String> primaryKey) { this.primaryKey = primaryKey; }
    public List<FunctionalDependencyDto> getFunctionalDependencies() { return functionalDependencies; }
    public void setFunctionalDependencies(List<FunctionalDependencyDto> functionalDependencies) { this.functionalDependencies = functionalDependencies; }

    public static class FunctionalDependencyDto {
        // frontend may send lhs/rhs as "a,b" strings or ["a","b"]
        private Object lhs;
        private Object rhs;

        public Object getLhs() { return lhs; }
        public void setLhs(Object lhs) { this.lhs = lhs; }
        public Object getRhs() { return rhs; }
        public void setRhs(Object rhs) { this.rhs = rhs; }
    }
}
