class SectionTitlesController < ApplicationController
  def create
    params.delete :section_title
    my_params = {name: params[:name], section_order: params[:section_order], project_id: params[:project_id], section_title_children: params[:section_title_children]}
    section_title = SectionTitle.new(my_params)

    if section_title.save!
      #update following section_orders by adding one
      SectionTitle.all.each{|title|
        title.section_order = title.section_order + 1 if (title != section_title) && (title.section_order >= section_title.section_order)
        title.save
      }
      render json: {message: 'Created.', section_title: section_title}
    end
  end

  def update
    render json: {message: 'landed at SectionTitlesController#update'}
  end
  def destroy
    render json: {message: 'landed at SectionTitlesController#destroy'}
  end
end
