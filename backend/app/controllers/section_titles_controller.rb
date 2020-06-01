class SectionTitlesController < ApplicationController
  def create
    params.delete :section_title
    my_params = {name: params[:name], section_order: params[:section_order], project_id: params[:project_id], section_title_children: params[:section_title_children]}
    section_title = SectionTitle.new(my_params)
    if section_title.save!
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
