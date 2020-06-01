class SectionTitleChildrenController < ApplicationController
  def create
    my_params = {content: params[:content], description: params[:description], name: params[:name], section_title_id: SectionTitle.find_by(section_order: params[:section_order]).id, child_order: params[:section_title_child][:child_order], type: params[:section_title_child][:type], url: params[:section_title_child][:url]}
    section_title_child = SectionTitleChild.new(my_params)
    if section_title_child.save!
      SectionTitleChild.all.each{|child|
        child.child_order = child.child_order + 1 if (child != section_title_child) && (child.child_order >= section_title_child.child_order) && (child.section_title == section_title_child.section_title)
        child.save
      }
      render json: {message: 'Created.', section_title_child: section_title_child}
    end
  end

  def update
    render json: {message: 'landed at SectionTitleChildrenController#update'}
  end
  def destroy
    render json: {message: 'landed at SectionTitleChildrenController#destroy'}
  end
end
