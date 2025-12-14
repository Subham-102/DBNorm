package com.dbnorm.dto;

import java.util.List;
import java.util.Set;

public class NormalizeResponse {

    public static class Relation {
        private String name;
        private Set<String> attributes;
        private List<FunctionalDependency> fds;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Set<String> getAttributes() { return attributes; }
        public void setAttributes(Set<String> attributes) { this.attributes = attributes; }
        public List<FunctionalDependency> getFds() { return fds; }
        public void setFds(List<FunctionalDependency> fds) { this.fds = fds; }
    }

    public static class FunctionalDependency {
        private Set<String> lhs;
        private Set<String> rhs;

        public Set<String> getLhs() { return lhs; }
        public void setLhs(Set<String> lhs) { this.lhs = lhs; }
        public Set<String> getRhs() { return rhs; }
        public void setRhs(Set<String> rhs) { this.rhs = rhs; }
    }

    private String targetNormalForm;
    public NormalizeResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public NormalizeResponse(String targetNormalForm, List<Relation> decomposition, List<String> notes) {
		super();
		this.targetNormalForm = targetNormalForm;
		this.decomposition = decomposition;
		this.notes = notes;
	}
	@Override
	public String toString() {
		return "NormalizeResponse [targetNormalForm=" + targetNormalForm + ", decomposition=" + decomposition
				+ ", notes=" + notes + "]";
	}
	private List<Relation> decomposition;
    private List<String> notes;

    public String getTargetNormalForm() { return targetNormalForm; }
    public void setTargetNormalForm(String targetNormalForm) { this.targetNormalForm = targetNormalForm; }
    public List<Relation> getDecomposition() { return decomposition; }
    public void setDecomposition(List<Relation> decomposition) { this.decomposition = decomposition; }
    public List<String> getNotes() { return notes; }
    public void setNotes(List<String> notes) { this.notes = notes; }
}
